# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.comment_create_input import CommentCreateInput  # noqa: E501
from swagger_server.models.comment_id_replies_body import CommentIdRepliesBody  # noqa: E501
from swagger_server.models.comment_id_report_body import CommentIdReportBody  # noqa: E501
from swagger_server.models.comment_response import CommentResponse  # noqa: E501
from swagger_server.models.comments_comment_id_body import CommentsCommentIdBody  # noqa: E501
from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response2003 import InlineResponse2003  # noqa: E501
from swagger_server.models.paginated_comment_list import PaginatedCommentList  # noqa: E501
from swagger_server.test import BaseTestCase


class TestCommentsController(BaseTestCase):
    """CommentsController integration test stubs"""

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

    def test_comments_comment_id_delete(self):
        """Test case for comments_comment_id_delete

        Eliminar comentario
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_get(self):
        """Test case for comments_comment_id_get

        Detalle de comentario
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_like_delete(self):
        """Test case for comments_comment_id_like_delete

        Quitar like a un comentario
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}/like'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_like_post(self):
        """Test case for comments_comment_id_like_post

        Dar like a un comentario
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}/like'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_patch(self):
        """Test case for comments_comment_id_patch

        Editar comentario (texto/estado)
        """
        body = CommentsCommentIdBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_replies_get(self):
        """Test case for comments_comment_id_replies_get

        Listar respuestas de un comentario (hilo)
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}/replies'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_replies_post(self):
        """Test case for comments_comment_id_replies_post

        Responder a un comentario
        """
        body = CommentIdRepliesBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}/replies'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_comment_id_report_post(self):
        """Test case for comments_comment_id_report_post

        Reportar comentario
        """
        body = CommentIdReportBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments/{commentId}/report'.format(comment_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_get(self):
        """Test case for comments_get

        Listar comentarios globales
        """
        query_string = [('page', 2),
                        ('limit', 100),
                        ('target_type', 'target_type_example'),
                        ('target_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('status', 'status_example'),
                        ('q', 'q_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_comments_post(self):
        """Test case for comments_post

        Crear comentario global
        """
        body = CommentCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/comments',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_comments_get(self):
        """Test case for merch_merch_id_comments_get

        Listar comentarios de un producto
        """
        query_string = [('page', 2),
                        ('limit', 100)]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/comments'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_comments_post(self):
        """Test case for merch_merch_id_comments_post

        Comentar en un producto
        """
        body = CommentCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/comments'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
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


if __name__ == '__main__':
    import unittest
    unittest.main()
