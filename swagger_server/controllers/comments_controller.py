import connexion
import six

from swagger_server.models.comment_create_input import CommentCreateInput  # noqa: E501
from swagger_server.models.comment_id_replies_body import CommentIdRepliesBody  # noqa: E501
from swagger_server.models.comment_id_report_body import CommentIdReportBody  # noqa: E501
from swagger_server.models.comment_response import CommentResponse  # noqa: E501
from swagger_server.models.comments_comment_id_body import CommentsCommentIdBody  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response2003 import InlineResponse2003  # noqa: E501
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


def comments_comment_id_delete(comment_id):  # noqa: E501
    """Eliminar comentario

     # noqa: E501

    :param comment_id: 
    :type comment_id: 

    :rtype: None
    """
    return 'do some magic!'


def comments_comment_id_get(comment_id):  # noqa: E501
    """Detalle de comentario

     # noqa: E501

    :param comment_id: 
    :type comment_id: 

    :rtype: CommentResponse
    """
    return 'do some magic!'


def comments_comment_id_like_delete(comment_id):  # noqa: E501
    """Quitar like a un comentario

     # noqa: E501

    :param comment_id: 
    :type comment_id: 

    :rtype: None
    """
    return 'do some magic!'


def comments_comment_id_like_post(comment_id):  # noqa: E501
    """Dar like a un comentario

     # noqa: E501

    :param comment_id: 
    :type comment_id: 

    :rtype: None
    """
    return 'do some magic!'


def comments_comment_id_patch(body, comment_id):  # noqa: E501
    """Editar comentario (texto/estado)

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param comment_id: 
    :type comment_id: 

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentsCommentIdBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def comments_comment_id_replies_get(comment_id):  # noqa: E501
    """Listar respuestas de un comentario (hilo)

     # noqa: E501

    :param comment_id: 
    :type comment_id: 

    :rtype: InlineResponse2003
    """
    return 'do some magic!'


def comments_comment_id_replies_post(body, comment_id):  # noqa: E501
    """Responder a un comentario

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param comment_id: 
    :type comment_id: 

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentIdRepliesBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def comments_comment_id_report_post(body, comment_id):  # noqa: E501
    """Reportar comentario

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param comment_id: 
    :type comment_id: 

    :rtype: None
    """
    if connexion.request.is_json:
        body = CommentIdReportBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def comments_get(page=None, limit=None, target_type=None, target_id=None, status=None, q=None):  # noqa: E501
    """Listar comentarios globales

     # noqa: E501

    :param page: 
    :type page: int
    :param limit: 
    :type limit: int
    :param target_type: 
    :type target_type: str
    :param target_id: 
    :type target_id: 
    :param status: 
    :type status: str
    :param q: 
    :type q: str

    :rtype: PaginatedCommentList
    """
    return 'do some magic!'


def comments_post(body):  # noqa: E501
    """Crear comentario global

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: CommentResponse
    """
    if connexion.request.is_json:
        body = CommentCreateInput.from_dict(connexion.request.get_json())  # noqa: E501
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
