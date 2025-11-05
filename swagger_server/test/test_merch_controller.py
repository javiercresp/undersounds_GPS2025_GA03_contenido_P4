# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

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
from swagger_server.test import BaseTestCase


class TestMerchController(BaseTestCase):
    """MerchController integration test stubs"""

    def test_merch_get(self):
        """Test case for merch_get

        Listar productos de merchandising
        """
        query_string = [('page', 2),
                        ('limit', 100),
                        ('artist_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('label_id', '38400000-8cf0-11bd-b23e-10b96e4ef00d'),
                        ('type', 'type_example'),
                        ('availability', 'availability_example'),
                        ('sort', 'sort_example'),
                        ('order', 'asc'),
                        ('q', 'q_example')]
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch',
            method='GET',
            query_string=query_string)
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

    def test_merch_merch_id_delete(self):
        """Test case for merch_merch_id_delete

        Eliminar producto
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_get(self):
        """Test case for merch_merch_id_get

        Detalle de producto
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_images_post(self):
        """Test case for merch_merch_id_images_post

        Subir imágenes del producto
        """
        data = dict(files='files_example',
                    alt='alt_example')
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/images'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=data,
            content_type='multipart/form-data')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_patch(self):
        """Test case for merch_merch_id_patch

        Actualizar producto
        """
        body = MerchUpdateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_variants_get(self):
        """Test case for merch_merch_id_variants_get

        Listar variantes de un producto
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/variants'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_variants_post(self):
        """Test case for merch_merch_id_variants_post

        Crear variante
        """
        body = VariantCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/variants'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_variants_variant_id_delete(self):
        """Test case for merch_merch_id_variants_variant_id_delete

        Eliminar variante
        """
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/variants/{variantId}'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', variant_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='DELETE')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_merch_id_variants_variant_id_patch(self):
        """Test case for merch_merch_id_variants_variant_id_patch

        Actualizar stock/precio de variante
        """
        body = VariantUpdateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch/{merchId}/variants/{variantId}'.format(merch_id='38400000-8cf0-11bd-b23e-10b96e4ef00d', variant_id='38400000-8cf0-11bd-b23e-10b96e4ef00d'),
            method='PATCH',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_merch_post(self):
        """Test case for merch_post

        Crear producto de merchandising
        """
        body = MerchCreateInput()
        response = self.client.open(
            '/escuelapolitecnicaca/contenido/1.0.0/merch',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
