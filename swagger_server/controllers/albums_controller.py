import connexion
import six

from swagger_server.models.album_create_input import AlbumCreateInput  # noqa: E501
from swagger_server.models.album_id_tracks_body import AlbumIdTracksBody  # noqa: E501
from swagger_server.models.album_response import AlbumResponse  # noqa: E501
from swagger_server.models.album_stats import AlbumStats  # noqa: E501
from swagger_server.models.album_update_input import AlbumUpdateInput  # noqa: E501
from swagger_server.models.comment_create_input import CommentCreateInput  # noqa: E501
from swagger_server.models.comment_response import CommentResponse  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.paginated_album_list import PaginatedAlbumList  # noqa: E501
from swagger_server.models.paginated_comment_list import PaginatedCommentList  # noqa: E501
from swagger_server import util


def albums_album_id_comments_get(album_id, page=None, limit=None):  # noqa: E501
    """Listar comentarios del álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedCommentList
    """
    return 'do some magic!'


def albums_album_id_comments_post(body, album_id):  # noqa: E501
    """Comentar en un álbum

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param album_id: 
    :type album_id: 

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def albums_album_id_cover_post(file, alt, album_id):  # noqa: E501
    """Subir o actualizar portada del álbum

     # noqa: E501

    :param file: 
    :type file: strstr
    :param alt: 
    :type alt: str
    :param album_id: 
    :type album_id: 

    :rtype: AlbumResponse
    """
    return 'do some magic!'


def albums_album_id_delete(album_id, hard=None):  # noqa: E501
    """Eliminar o archivar lógicamente un álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 
    :param hard: Si true, borrado físico irreversible
    :type hard: bool

    :rtype: None
    """
    return 'do some magic!'


def albums_album_id_get(album_id, include=None):  # noqa: E501
    """Obtener detalle de un álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 
    :param include: Campos relacionados a incluir, separados por coma. Ej. &#x60;tracks,label,stats&#x60;
    :type include: List[str]

    :rtype: AlbumResponse
    """
    return 'do some magic!'


def albums_album_id_patch(body, album_id):  # noqa: E501
    """Actualizar parcialmente un álbum

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param album_id: 
    :type album_id: 

    :rtype: AlbumResponse
    """
    if connexion.request.is_json:
        body = AlbumUpdateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def albums_album_id_publish_post(album_id):  # noqa: E501
    """Publicar álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 

    :rtype: AlbumResponse
    """
    return 'do some magic!'


def albums_album_id_stats_get(album_id, range=None):  # noqa: E501
    """Estadísticas de un álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 
    :param range: Rango temporal para agregados
    :type range: str

    :rtype: AlbumStats
    """
    return 'do some magic!'


def albums_album_id_tracks_post(body, album_id):  # noqa: E501
    """Añadir pistas a un álbum

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param album_id: 
    :type album_id: 

    :rtype: AlbumResponse
    """
    if connexion.request.is_json:
        body = AlbumIdTracksBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def albums_album_id_tracks_track_id_delete(album_id, track_id):  # noqa: E501
    """Quitar una pista del álbum

     # noqa: E501

    :param album_id: 
    :type album_id: 
    :param track_id: 
    :type track_id: 

    :rtype: None
    """
    return 'do some magic!'


def albums_get(page=None, limit=None, include=None, artist_id=None, label_id=None, genre=None, tag=None, release_state=None, q=None):  # noqa: E501
    """Listar álbumes

     # noqa: E501

    :param page: 
    :type page: int
    :param limit: 
    :type limit: int
    :param include: Campos relacionados a incluir, separados por coma. Ej. &#x60;tracks,label,stats&#x60;
    :type include: List[str]
    :param artist_id: 
    :type artist_id: 
    :param label_id: 
    :type label_id: 
    :param genre: 
    :type genre: str
    :param tag: 
    :type tag: str
    :param release_state: Estado de publicación
    :type release_state: str
    :param q: Búsqueda full-text por título/descripcion
    :type q: str

    :rtype: PaginatedAlbumList
    """
    return 'do some magic!'


def albums_post(body):  # noqa: E501
    """Crear álbum

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: AlbumResponse
    """
    if connexion.request.is_json:
        body = AlbumCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def labels_label_id_albums_get(label_id, page=None, limit=None):  # noqa: E501
    """Discografía de la label

     # noqa: E501

    :param label_id: 
    :type label_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedAlbumList
    """
    return 'do some magic!'
