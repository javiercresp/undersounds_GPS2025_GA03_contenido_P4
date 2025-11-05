# coding: utf-8

import sys
from setuptools import setup, find_packages

NAME = "swagger_server"
VERSION = "1.0.0"
# To install the library, run the following
#
# python setup.py install
#
# prerequisite: setuptools
# http://pypi.python.org/pypi/setuptools

REQUIRES = [
    "connexion",
    "swagger-ui-bundle>=0.0.2"
]

setup(
    name=NAME,
    version=VERSION,
    description="UnderSound Content API",
    author_email="",
    url="",
    keywords=["Swagger", "UnderSound Content API"],
    install_requires=REQUIRES,
    packages=find_packages(),
    package_data={'': ['swagger/swagger.yaml']},
    include_package_data=True,
    entry_points={
        'console_scripts': ['swagger_server=swagger_server.__main__:main']},
    long_description="""\
    API de contenido inspirada en Bandcamp para gestionar **álbumes, pistas, merchandising, labels y comentarios**. Incluye paginación, filtros, subida de archivos (multipart), acciones de publicación y favoritos. 
    """
)
