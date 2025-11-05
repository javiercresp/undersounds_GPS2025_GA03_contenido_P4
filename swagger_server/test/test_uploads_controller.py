# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.album_response import AlbumResponse  # noqa: E501
from swagger_server.models.merch_response import MerchResponse  # noqa: E501
from swagger_server.models.track_response import TrackResponse  # noqa: E501
from swagger_server.test import BaseTestCase


class TestUploadsController(BaseTestCase):
    """UploadsController integration test stubs"""

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


if __name__ == '__main__':
    import unittest
    unittest.main()
