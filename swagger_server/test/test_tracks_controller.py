# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

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
from swagger_server.test import BaseTestCase


class TestTracksController(BaseTestCase):
    """TracksController integration test stubs"""

    def test_tracks_get(self):
        """Test case for tracks_get

        Listar pistas
        """
        query_string = [('page', 2),
                        ('limit', 100),
                        ('include', 'include_example'),
                        ('album_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('artist_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('label_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('genre', 'genre_example'),
                        ('tag', 'tag_example'),
                        ('language', 'language_example'),
                        ('min_duration_sec', 1),
                        ('max_duration_sec', 1),
                        ('released_from', '2013-10-20'),
                        ('released_to', '2013-10-20'),
                        ('sort', 'sort_example'),
                        ('order', 'asc'),
                        ('q', 'q_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_post(self):
        """Test case for tracks_post

        Crear pista
        """
        body = TrackCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_audio_post(self):
        """Test case for tracks_track_id_audio_post

        Subir o actualizar archivo de audio
        """
        data = dict(file='file_example',
                    bitrate=65,
                    codec='codec_example')
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}/audio'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_comments_get(self):
        """Test case for tracks_track_id_comments_get

        Listar comentarios de una pista
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}/comments'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_comments_post(self):
        """Test case for tracks_track_id_comments_post

        Comentar en una pista
        """
        body = CommentCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}/comments'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_delete(self):
        """Test case for tracks_track_id_delete

        Eliminar pista
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_get(self):
        """Test case for tracks_track_id_get

        Detalle de pista
        """
        query_string = [('include', 'include_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_lyrics_post(self):
        """Test case for tracks_track_id_lyrics_post

        Añadir o actualizar letras
        """
        body = TrackIdLyricsBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}/lyrics'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_patch(self):
        """Test case for tracks_track_id_patch

        Actualizar parcialmente una pista
        """
        body = TrackUpdateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_tracks_track_id_stream_get(self):
        """Test case for tracks_track_id_stream_get

        URL de streaming/preview (redirección 302 o URL firmada)
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/tracks/{trackId}/stream'.format(track_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
