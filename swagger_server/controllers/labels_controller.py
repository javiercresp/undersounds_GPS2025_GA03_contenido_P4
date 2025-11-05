import connexion
import six

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response2002 import InlineResponse2002  # noqa: E501
from swagger_server.models.label_create_input import LabelCreateInput  # noqa: E501
from swagger_server.models.label_id_artists_body import LabelIdArtistsBody  # noqa: E501
from swagger_server.models.label_response import LabelResponse  # noqa: E501
from swagger_server.models.label_update_input import LabelUpdateInput  # noqa: E501
from swagger_server.models.paginated_album_list import PaginatedAlbumList  # noqa: E501
from swagger_server.models.paginated_label_list import PaginatedLabelList  # noqa: E501
from swagger_server import util


def labels_get(page=None, limit=None, q=None, country=None):  # noqa: E501
    """Listar labels

     # noqa: E501

    :param page: 
    :type page: int
    :param limit: 
    :type limit: int
    :param q: 
    :type q: str
    :param country: 
    :type country: str

    :rtype: PaginatedLabelList
    """
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


def labels_label_id_artists_artist_id_delete(label_id, artist_id):  # noqa: E501
    """Desasociar artista de la label

     # noqa: E501

    :param label_id: 
    :type label_id: 
    :param artist_id: 
    :type artist_id: 

    :rtype: None
    """
    return 'do some magic!'


def labels_label_id_artists_get(label_id):  # noqa: E501
    """Artistas asociados a la label

     # noqa: E501

    :param label_id: 
    :type label_id: 

    :rtype: InlineResponse2002
    """
    return 'do some magic!'


def labels_label_id_artists_post(body, label_id):  # noqa: E501
    """Asociar artistas a la label

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param label_id: 
    :type label_id: 

    :rtype: InlineResponse2002
    """
    if connexion.request.is_json:
        body = LabelIdArtistsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def labels_label_id_delete(label_id):  # noqa: E501
    """Eliminar label

     # noqa: E501

    :param label_id: 
    :type label_id: 

    :rtype: None
    """
    return 'do some magic!'


def labels_label_id_get(label_id, include=None):  # noqa: E501
    """Detalle de label

     # noqa: E501

    :param label_id: 
    :type label_id: 
    :param include: Campos relacionados a incluir, separados por coma. Ej. &#x60;tracks,label,stats&#x60;
    :type include: List[str]

    :rtype: LabelResponse
    """
    return 'do some magic!'


def labels_label_id_patch(body, label_id):  # noqa: E501
    """Actualizar label

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param label_id: 
    :type label_id: 

    :rtype: LabelResponse
    """
    if connexion.request.is_json:
        body = LabelUpdateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def labels_post(body):  # noqa: E501
    """Crear label

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: LabelResponse
    """
    if connexion.request.is_json:
        body = LabelCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
