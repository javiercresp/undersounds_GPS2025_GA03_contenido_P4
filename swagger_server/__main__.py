#!/usr/bin/env python3
import connexion
from pathlib import Path
import yaml
from flask import jsonify, redirect  # << usamos las respuestas de Flask

from swagger_server import encoder


def main():
    # App de Connexion con backend Flask, leyendo la spec desde ./swagger/
    app = connexion.App(__name__, specification_dir='./swagger/')
    encoder.configure_app(app.app)

    # Añadimos el API pero SIN que Connexion sirva el spec, para evitar el "circular reference"
    app.add_api(
        'swagger.yaml',
        pythonic_params=True,
        swagger_ui=True,
        strict_validation=True,
        serve_spec=False,   # << clave para evitar el error
        base_path='/'       # UI en /ui/ y spec en /openapi.json
    )

    # Cargamos el YAML una vez y servimos /openapi.json nosotros (JSON plano)
    spec_path = Path(__file__).parent / 'swagger' / 'swagger.yaml'
    with spec_path.open('r', encoding='utf-8') as f:
        spec_dict = yaml.safe_load(f)

    # ---- Rutas Flask ----
    def openapi_json():
        return jsonify(spec_dict)

    app.app.add_url_rule('/openapi.json', 'openapi_json', openapi_json, methods=['GET'])

    def root_redirect():
        return redirect('/ui/')

    app.app.add_url_rule('/', 'root_redirect', root_redirect, methods=['GET'])
    # ---------------------

    app.run(port=8080)


if __name__ == '__main__':
    main()
