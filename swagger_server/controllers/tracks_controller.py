import connexion
import six

from swagger_server.models.comment_create_input import CommentCreateInput  # noqa: E501
from swagger_server.models.comment_response import CommentResponse  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.paginated_comment_list import PaginatedCommentList  # noqa: E501
from swagger_server.models.paginated_track_list import PaginatedTrackList  # noqa: E501
from swagger_server.models.track_create_input import TrackCreateInput  # noqa: E501
from swagger_server.models.track_id_lyrics_body import TrackIdLyricsBody  # noqa: E501
from swagger_server.models.track_response import TrackResponse  # noqa: E501
from swagger_server.models.track_update_input import TrackUpdateInput  # noqa: E501
from swagger_server import util


def tracks_get(page=None, limit=None, include=None, album_id=None, artist_id=None, label_id=None, genre=None, tag=None, language=None, min_duration_sec=None, max_duration_sec=None, released_from=None, released_to=None, sort=None, order=None, q=None):  # noqa: E501
    """Listar pistas

     # noqa: E501

    :param page: 
    :type page: int
    :param limit: 
    :type limit: int
    :param include: Campos relacionados a incluir, separados por coma. Ej. &#x60;tracks,label,stats&#x60;
    :type include: List[str]
    :param album_id: 
    :type album_id: 
    :param artist_id: 
    :type artist_id: 
    :param label_id: 
    :type label_id: 
    :param genre: 
    :type genre: str
    :param tag: 
    :type tag: str
    :param language: 
    :type language: str
    :param min_duration_sec: 
    :type min_duration_sec: int
    :param max_duration_sec: 
    :type max_duration_sec: int
    :param released_from: 
    :type released_from: str
    :param released_to: 
    :type released_to: str
    :param sort: Campo de ordenación
    :type sort: str
    :param order: 
    :type order: str
    :param q: 
    :type q: str

    :rtype: PaginatedTrackList
    """
    released_from = util.deserialize_date(released_from)
    released_to = util.deserialize_date(released_to)
    return 'do some magic!'


def tracks_post(body):  # noqa: E501
    """Crear pista

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: TrackResponse
    """
    if connexion.request.is_json:
        body = TrackCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def tracks_track_id_audio_post(file, bitrate, codec, track_id):  # noqa: E501
    """Subir o actualizar archivo de audio

     # noqa: E501

    :param file: 
    :type file: strstr
    :param bitrate: 
    :type bitrate: int
    :param codec: 
    :type codec: str
    :param track_id: 
    :type track_id: 

    :rtype: TrackResponse
    """
    return 'do some magic!'


def tracks_track_id_comments_get(track_id, page=None, limit=None):  # noqa: E501
    """Listar comentarios de una pista

     # noqa: E501

    :param track_id: 
    :type track_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedCommentList
    """
    return 'do some magic!'


def tracks_track_id_comments_post(body, track_id):  # noqa: E501
    """Comentar en una pista

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param track_id: 
    :type track_id: 

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def tracks_track_id_delete(track_id):  # noqa: E501
    """Eliminar pista

     # noqa: E501

    :param track_id: 
    :type track_id: 

    :rtype: None
    """
    return 'do some magic!'


def tracks_track_id_get(track_id, include=None):  # noqa: E501
    """Detalle de pista

     # noqa: E501

    :param track_id: 
    :type track_id: 
    :param include: Campos relacionados a incluir, separados por coma. Ej. &#x60;tracks,label,stats&#x60;
    :type include: List[str]

    :rtype: TrackResponse
    """
    return 'do some magic!'


def tracks_track_id_lyrics_post(body, track_id):  # noqa: E501
    """Añadir o actualizar letras

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param track_id: 
    :type track_id: 

    :rtype: TrackResponse
    """
    if connexion.request.is_json:
        body = TrackIdLyricsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def tracks_track_id_patch(body, track_id):  # noqa: E501
    """Actualizar parcialmente una pista

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param track_id: 
    :type track_id: 

    :rtype: TrackResponse
    """
    if connexion.request.is_json:
        body = TrackUpdateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def tracks_track_id_stream_get(track_id):  # noqa: E501
    """URL de streaming/preview (redirección 302 o URL firmada)

     # noqa: E501

    :param track_id: 
    :type track_id: 

    :rtype: InlineResponse200
    """
    return 'do some magic!'
