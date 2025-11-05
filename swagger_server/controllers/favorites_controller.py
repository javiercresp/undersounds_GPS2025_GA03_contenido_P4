import connexion
import six

from swagger_server.models.favorites_albums_body import FavoritesAlbumsBody  # noqa: E501
from swagger_server.models.favorites_merch_body import FavoritesMerchBody  # noqa: E501
from swagger_server.models.paginated_album_list import PaginatedAlbumList  # noqa: E501
from swagger_server.models.paginated_merch_list import PaginatedMerchList  # noqa: E501
from swagger_server import util


def users_user_id_favorites_albums_album_id_delete(user_id, album_id):  # noqa: E501
    """Quitar álbum de favoritos

     # noqa: E501

    :param user_id: 
    :type user_id: 
    :param album_id: 
    :type album_id: 

    :rtype: None
    """
    return 'do some magic!'


def users_user_id_favorites_albums_get(user_id, page=None, limit=None):  # noqa: E501
    """Listar álbumes favoritos de un usuario

     # noqa: E501

    :param user_id: 
    :type user_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedAlbumList
    """
    return 'do some magic!'


def users_user_id_favorites_albums_post(body, user_id):  # noqa: E501
    """Añadir álbum a favoritos

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param user_id: 
    :type user_id: 

    :rtype: None
    """
    if connexion.request.is_json:
        body = FavoritesAlbumsBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def users_user_id_favorites_merch_get(user_id, page=None, limit=None):  # noqa: E501
    """Listar productos de merch favoritos de un usuario

     # noqa: E501

    :param user_id: 
    :type user_id: 
    :param page: 
    :type page: int
    :param limit: 
    :type limit: int

    :rtype: PaginatedMerchList
    """
    return 'do some magic!'


def users_user_id_favorites_merch_merch_id_delete(user_id, merch_id):  # noqa: E501
    """Quitar producto de merch de favoritos

     # noqa: E501

    :param user_id: 
    :type user_id: 
    :param merch_id: 
    :type merch_id: 

    :rtype: None
    """
    return 'do some magic!'


def users_user_id_favorites_merch_post(body, user_id):  # noqa: E501
    """Añadir producto de merch a favoritos

     # noqa: E501

    :param body: 
    :type body: dict | bytes
    :param user_id: 
    :type user_id: 

    :rtype: None
    """
    if connexion.request.is_json:
        body = FavoritesMerchBody.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
