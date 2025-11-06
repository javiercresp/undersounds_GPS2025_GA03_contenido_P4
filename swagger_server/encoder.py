"""Custom JSON serialisation helpers compatible with Flask <2.3 and >=2.3."""

from __future__ import annotations

import six
from typing import Any

from swagger_server.models.base_model_ import Model

try:  # Flask < 2.3
    from flask.json import JSONEncoder as _BaseJSONEncoder  # type: ignore
except Exception:  # pragma: no cover
    from json import JSONEncoder as _BaseJSONEncoder  # type: ignore

try:  # Flask >= 2.3
    from flask.json.provider import DefaultJSONProvider  # type: ignore
except Exception:  # pragma: no cover
    DefaultJSONProvider = None  # type: ignore


class _ModelEncodingMixin:
    include_none = False  # mimic connexion's default

    def _encode_model(self, o: Any):
        if isinstance(o, Model):
            dikt = {}
            for attr, _ in six.iteritems(o.swagger_types):
                value = getattr(o, attr)
                if value is None and not self.include_none:
                    continue
                key = o.attribute_map.get(attr, attr)
                if isinstance(value, Model):
                    value = self._encode_model(value)
                elif isinstance(value, (list, tuple)):
                    value = [self._encode_model(v) if isinstance(v, Model) else v for v in value]
                elif isinstance(value, dict):
                    value = {k: self._encode_model(v) if isinstance(v, Model) else v for k, v in value.items()}
                dikt[key] = value
            return dikt
        return None


class JSONEncoder(_ModelEncodingMixin, _BaseJSONEncoder):
    def default(self, o: Any):
        encoded = self._encode_model(o)
        if encoded is not None:
            return encoded
        return super().default(o)


if DefaultJSONProvider is not None:

    class JSONProvider(_ModelEncodingMixin, DefaultJSONProvider):  # type: ignore
        def default(self, o: Any):  # Flask uses this in dumps
            encoded = self._encode_model(o)
            if encoded is not None:
                return encoded
            return super().default(o)


def configure_app(flask_app):
    """Configure JSON handling for a Flask application instance."""
    if DefaultJSONProvider is not None:
        flask_app.json_provider_class = JSONProvider
        flask_app.json = flask_app.json_provider_class(flask_app)
    else:
        flask_app.json_encoder = JSONEncoder
