import connexion
import six

from swagger_server.models.album_response import AlbumResponse  # noqa: E501
from swagger_server.models.merch_response import MerchResponse  # noqa: E501
from swagger_server.models.track_response import TrackResponse  # noqa: E501
from swagger_server import util


def albums_album_id_cover_post(file, alt, album_id):  # noqa: E501
    """Subir o actualizar portada del álbum

     # noqa: E501

    :param file: 
    :type file: strstr
    :param alt: 
    :type alt: str
    :param album_id: 
    :type album_id: 

    :rtype: AlbumResponse
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


def tracks_track_id_audio_post(file, bitrate, codec, track_id):  # noqa: E501
    """Subir o actualizar archivo de audio

     # noqa: E501

    :param file: 
    :type file: strstr
    :param bitrate: 
    :type bitrate: int
    :param codec: 
    :type codec: str
    :param track_id: 
    :type track_id: 

    :rtype: TrackResponse
    """
    return 'do some magic!'
