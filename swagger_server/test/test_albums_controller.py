# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

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
from swagger_server.test import BaseTestCase


class TestAlbumsController(BaseTestCase):
    """AlbumsController integration test stubs"""

    def test_albums_album_id_comments_get(self):
        """Test case for albums_album_id_comments_get

        Listar comentarios del álbum
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/comments'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_comments_post(self):
        """Test case for albums_album_id_comments_post

        Comentar en un álbum
        """
        body = CommentCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/comments'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_cover_post(self):
        """Test case for albums_album_id_cover_post

        Subir o actualizar portada del álbum
        """
        data = dict(file='file_example',
                    alt='alt_example')
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/cover'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_delete(self):
        """Test case for albums_album_id_delete

        Eliminar o archivar lógicamente un álbum
        """
        query_string = [('hard', false)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_get(self):
        """Test case for albums_album_id_get

        Obtener detalle de un álbum
        """
        query_string = [('include', 'include_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_patch(self):
        """Test case for albums_album_id_patch

        Actualizar parcialmente un álbum
        """
        body = AlbumUpdateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_publish_post(self):
        """Test case for albums_album_id_publish_post

        Publicar álbum
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/publish'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_stats_get(self):
        """Test case for albums_album_id_stats_get

        Estadísticas de un álbum
        """
        query_string = [('range', 'all')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/stats'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_tracks_post(self):
        """Test case for albums_album_id_tracks_post

        Añadir pistas a un álbum
        """
        body = AlbumIdTracksBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/tracks'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_album_id_tracks_track_id_delete(self):
        """Test case for albums_album_id_tracks_track_id_delete

        Quitar una pista del álbum
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums/{albumId}/tracks/{trackId}'.format(album_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_get(self):
        """Test case for albums_get

        Listar álbumes
        """
        query_string = [('page', 2),
                        ('limit', 100),
                        ('include', 'include_example'),
                        ('artist_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('label_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('genre', 'genre_example'),
                        ('tag', 'tag_example'),
                        ('release_state', 'release_state_example'),
                        ('q', 'q_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_albums_post(self):
        """Test case for albums_post

        Crear álbum
        """
        body = AlbumCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/albums',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_albums_get(self):
        """Test case for labels_label_id_albums_get

        Discografía de la label
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}/albums'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
