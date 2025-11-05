# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.error import Error  # noqa: E501
from swagger_server.models.inline_response2002 import InlineResponse2002  # noqa: E501
from swagger_server.models.label_create_input import LabelCreateInput  # noqa: E501
from swagger_server.models.label_id_artists_body import LabelIdArtistsBody  # noqa: E501
from swagger_server.models.label_response import LabelResponse  # noqa: E501
from swagger_server.models.label_update_input import LabelUpdateInput  # noqa: E501
from swagger_server.models.paginated_album_list import PaginatedAlbumList  # noqa: E501
from swagger_server.models.paginated_label_list import PaginatedLabelList  # noqa: E501
from swagger_server.test import BaseTestCase


class TestLabelsController(BaseTestCase):
    """LabelsController integration test stubs"""

    def test_labels_get(self):
        """Test case for labels_get

        Listar labels
        """
        query_string = [('page', 2),
                        ('limit', 100),
                        ('q', 'q_example'),
                        ('country', 'country_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels',
            method='GET',
            query_string=query_string)
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

    def test_labels_label_id_artists_artist_id_delete(self):
        """Test case for labels_label_id_artists_artist_id_delete

        Desasociar artista de la label
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}/artists/{artistId}'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', artist_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_artists_get(self):
        """Test case for labels_label_id_artists_get

        Artistas asociados a la label
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}/artists'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_artists_post(self):
        """Test case for labels_label_id_artists_post

        Asociar artistas a la label
        """
        body = LabelIdArtistsBody()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}/artists'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_delete(self):
        """Test case for labels_label_id_delete

        Eliminar label
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_get(self):
        """Test case for labels_label_id_get

        Detalle de label
        """
        query_string = [('include', 'include_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_label_id_patch(self):
        """Test case for labels_label_id_patch

        Actualizar label
        """
        body = LabelUpdateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels/{labelId}'.format(label_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_labels_post(self):
        """Test case for labels_post

        Crear label
        """
        body = LabelCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/labels',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
