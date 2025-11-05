# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.favorites_albums_body import FavoritesAlbumsBody  # noqa: E501
from swagger_server.models.favorites_merch_body import FavoritesMerchBody  # noqa: E501
from swagger_server.models.paginated_album_list import PaginatedAlbumList  # noqa: E501
from swagger_server.models.paginated_merch_list import PaginatedMerchList  # noqa: E501
from swagger_server.test import BaseTestCase


class TestFavoritesController(BaseTestCase):
    """FavoritesController integration test stubs"""

    def test_users_user_id_favorites_albums_album_id_delete(self):
        """Test case for users_user_id_favorites_albums_album_id_delete

        Quitar álbum de favoritos
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/albums/{albumId}'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_users_user_id_favorites_albums_get(self):
        """Test case for users_user_id_favorites_albums_get

        Listar álbumes favoritos de un usuario
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/albums'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_users_user_id_favorites_albums_post(self):
        """Test case for users_user_id_favorites_albums_post

        Añadir álbum a favoritos
        """
        body = FavoritesAlbumsBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/albums'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_users_user_id_favorites_merch_get(self):
        """Test case for users_user_id_favorites_merch_get

        Listar productos de merch favoritos de un usuario
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/merch'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_users_user_id_favorites_merch_merch_id_delete(self):
        """Test case for users_user_id_favorites_merch_merch_id_delete

        Quitar producto de merch de favoritos
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/merch/{merchId}'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_users_user_id_favorites_merch_post(self):
        """Test case for users_user_id_favorites_merch_post

        Añadir producto de merch a favoritos
        """
        body = FavoritesMerchBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/users/{userId}/favorites/merch'.format(user_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
