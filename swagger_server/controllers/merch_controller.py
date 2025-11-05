import connexion
import six

from swagger_server.models.comment_create_input import CommentCreateInput  # noqa: E501
from swagger_server.models.comment_response import CommentResponse  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response2001 import InlineResponse2001  # noqa: E501
from swagger_server.models.inline_response201 import InlineResponse201  # noqa: E501
from swagger_server.models.merch_create_input import MerchCreateInput  # noqa: E501
from swagger_server.models.merch_response import MerchResponse  # noqa: E501
from swagger_server.models.merch_update_input import MerchUpdateInput  # noqa: E501
from swagger_server.models.paginated_comment_list import PaginatedCommentList  # noqa: E501
from swagger_server.models.paginated_merch_list import PaginatedMerchList  # noqa: E501
from swagger_server.models.variant_create_input import VariantCreateInput  # noqa: E501
from swagger_server.models.variant_update_input import VariantUpdateInput  # noqa: E501
from swagger_server import util


def merch_get(page=None, limit=None, artist_id=None, label_id=None, type=None, availability=None, sort=None, order=None, q=None):  # noqa: E501
    """Listar productos de merchandising

     # noqa: E501

    :param page: 
    :type page: int
    :param limit: 
    :type limit: int
    :param artist_id: 
    :type artist_id: 
    :param label_id: 
    :type label_id: 
    :param type: Tipo de producto
    :type type: str
    :param availability: 
    :type availability: str
    :param sort: Campo de ordenación
    :type sort: str
    :param order: 
    :type order: str
    :param q: 
    :type q: str

    :rtype: PaginatedMerchList
    """
    return 'do some magic!'


def merch_merch_id_comments_get(merch_id, page=None, limit=None):  # noqa: E501
    """Listar comentarios de un producto

     # noqa: E501

    :param merch_id: 
    :type merch_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedCommentList
    """
    return 'do some magic!'


def merch_merch_id_comments_post(body, merch_id):  # noqa: E501
    """Comentar en un producto

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param merch_id: 
    :type merch_id: 

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def merch_merch_id_delete(merch_id):  # noqa: E501
    """Eliminar producto

     # noqa: E501

    :param merch_id: 
    :type merch_id: 

    :rtype: None
    """
    return 'do some magic!'


def merch_merch_id_get(merch_id):  # noqa: E501
    """Detalle de producto

     # noqa: E501

    :param merch_id: 
    :type merch_id: 

    :rtype: MerchResponse
    """
    return 'do some magic!'


def merch_merch_id_images_post(files, alt, merch_id):  # noqa: E501
    """Subir imágenes del producto

     # noqa: E501

    :param files: 
    :type files: List[strstr]
    :param alt: 
    :type alt: str
    :param merch_id: 
    :type merch_id: 

    :rtype: MerchResponse
    """
    return 'do some magic!'


def merch_merch_id_patch(body, merch_id):  # noqa: E501
    """Actualizar producto

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param merch_id: 
    :type merch_id: 

    :rtype: MerchResponse
    """
    if connexion.request.is_json:
        body = MerchUpdateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def merch_merch_id_variants_get(merch_id):  # noqa: E501
    """Listar variantes de un producto

     # noqa: E501

    :param merch_id: 
    :type merch_id: 

    :rtype: InlineResponse2001
    """
    return 'do some magic!'


def merch_merch_id_variants_post(body, merch_id):  # noqa: E501
    """Crear variante

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param merch_id: 
    :type merch_id: 

    :rtype: InlineResponse201
    """
    if connexion.request.is_json:
        body = VariantCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def merch_merch_id_variants_variant_id_delete(merch_id, variant_id):  # noqa: E501
    """Eliminar variante

     # noqa: E501

    :param merch_id: 
    :type merch_id: 
    :param variant_id: 
    :type variant_id: 

    :rtype: None
    """
    return 'do some magic!'


def merch_merch_id_variants_variant_id_patch(body, merch_id, variant_id):  # noqa: E501
    """Actualizar stock/precio de variante

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param merch_id: 
    :type merch_id: 
    :param variant_id: 
    :type variant_id: 

    :rtype: InlineResponse201
    """
    if connexion.request.is_json:
        body = VariantUpdateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def merch_post(body):  # noqa: E501
    """Crear producto de merchandising

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: MerchResponse
    """
    if connexion.request.is_json:
        body = MerchCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
