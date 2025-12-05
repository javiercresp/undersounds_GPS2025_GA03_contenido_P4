'use strict';


/**
 * Listar labels
 *
 * page Integer  (optional)
 * limit Integer  (optional)
 * q String  (optional)
 * country String  (optional)
 * returns PaginatedLabelList
 **/
exports.labelsGET = function(page,limit,q,country) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "country" : "country",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "albums" : [ {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "artists" : [ {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    }, {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    } ],
    "name" : "name",
    "description" : "description",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "url" : "http://example.com/aeiou",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  }, {
    "country" : "country",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "albums" : [ {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "artists" : [ {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    }, {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    } ],
    "name" : "name",
    "description" : "description",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "url" : "http://example.com/aeiou",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  } ],
  "meta" : {
    "total" : 123,
    "limit" : 20,
    "page" : 1
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Discografía de la label
 *
 * labelId UUID 
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedAlbumList
 **/
exports.labelsLabelIdAlbumsGET = function(labelId,page,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "artist" : {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    },
    "releaseDate" : "2000-01-23",
    "description" : "description",
    "label" : {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    },
    "title" : "title",
    "tracks" : [ {
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "trackNumber" : 5,
      "stats" : {
        "playCount" : 7
      },
      "album" : {
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "title" : "title"
      },
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "audio" : {
        "codec" : "codec",
        "bitrate" : 2,
        "url" : "http://example.com/aeiou"
      },
      "title" : "title",
      "durationSec" : 5,
      "lyrics" : {
        "language" : "language",
        "text" : "text"
      },
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "trackNumber" : 5,
      "stats" : {
        "playCount" : 7
      },
      "album" : {
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "title" : "title"
      },
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "audio" : {
        "codec" : "codec",
        "bitrate" : 2,
        "url" : "http://example.com/aeiou"
      },
      "title" : "title",
      "durationSec" : 5,
      "lyrics" : {
        "language" : "language",
        "text" : "text"
      },
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "tags" : [ "tags", "tags" ],
    "cover" : {
      "alt" : "alt",
      "width" : 6,
      "url" : "http://example.com/aeiou",
      "height" : 1
    },
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "stats" : {
      "playCount" : 9,
      "likeCount" : 3,
      "ratingAvg" : 4.5,
      "commentCount" : 2
    },
    "price" : 0.8008282,
    "genres" : [ "genres", "genres" ],
    "currency" : "EUR",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "releaseState" : "draft",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  }, {
    "artist" : {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    },
    "releaseDate" : "2000-01-23",
    "description" : "description",
    "label" : {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    },
    "title" : "title",
    "tracks" : [ {
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "trackNumber" : 5,
      "stats" : {
        "playCount" : 7
      },
      "album" : {
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "title" : "title"
      },
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "audio" : {
        "codec" : "codec",
        "bitrate" : 2,
        "url" : "http://example.com/aeiou"
      },
      "title" : "title",
      "durationSec" : 5,
      "lyrics" : {
        "language" : "language",
        "text" : "text"
      },
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "trackNumber" : 5,
      "stats" : {
        "playCount" : 7
      },
      "album" : {
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "title" : "title"
      },
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "audio" : {
        "codec" : "codec",
        "bitrate" : 2,
        "url" : "http://example.com/aeiou"
      },
      "title" : "title",
      "durationSec" : 5,
      "lyrics" : {
        "language" : "language",
        "text" : "text"
      },
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "tags" : [ "tags", "tags" ],
    "cover" : {
      "alt" : "alt",
      "width" : 6,
      "url" : "http://example.com/aeiou",
      "height" : 1
    },
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "stats" : {
      "playCount" : 9,
      "likeCount" : 3,
      "ratingAvg" : 4.5,
      "commentCount" : 2
    },
    "price" : 0.8008282,
    "genres" : [ "genres", "genres" ],
    "currency" : "EUR",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "releaseState" : "draft",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  } ],
  "meta" : {
    "total" : 123,
    "limit" : 20,
    "page" : 1
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Desasociar artista de la label
 *
 * labelId UUID 
 * artistId UUID 
 * no response value expected for this operation
 **/
exports.labelsLabelIdArtistsArtistIdDELETE = function(labelId,artistId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Artistas asociados a la label
 *
 * labelId UUID 
 * returns inline_response_200_2
 **/
exports.labelsLabelIdArtistsGET = function(labelId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "name",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
  }, {
    "name" : "name",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Asociar artistas a la label
 *
 * body LabelId_artists_body 
 * labelId UUID 
 * returns inline_response_200_2
 **/
exports.labelsLabelIdArtistsPOST = function(body,labelId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "name",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
  }, {
    "name" : "name",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Eliminar label
 *
 * labelId UUID 
 * no response value expected for this operation
 **/
exports.labelsLabelIdDELETE = function(labelId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Detalle de label
 *
 * labelId UUID 
 * include List Campos relacionados a incluir, separados por coma. Ej. `tracks,label,stats` (optional)
 * returns LabelResponse
 **/
exports.labelsLabelIdGET = function(labelId,include) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "country" : "country",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "albums" : [ {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "artists" : [ {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    }, {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    } ],
    "name" : "name",
    "description" : "description",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "url" : "http://example.com/aeiou",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Actualizar label
 *
 * body LabelUpdateInput 
 * labelId UUID 
 * returns LabelResponse
 **/
exports.labelsLabelIdPATCH = function(body,labelId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "country" : "country",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "albums" : [ {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "artists" : [ {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    }, {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    } ],
    "name" : "name",
    "description" : "description",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "url" : "http://example.com/aeiou",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Crear label
 *
 * body LabelCreateInput 
 * returns LabelResponse
 **/
exports.labelsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "country" : "country",
    "createdAt" : "2000-01-23T04:56:07.000+00:00",
    "albums" : [ {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    }, {
      "artist" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "releaseDate" : "2000-01-23",
      "description" : "description",
      "label" : {
        "name" : "name",
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      },
      "title" : "title",
      "tracks" : [ {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      }, {
        "createdAt" : "2000-01-23T04:56:07.000+00:00",
        "trackNumber" : 5,
        "stats" : {
          "playCount" : 7
        },
        "album" : {
          "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          "title" : "title"
        },
        "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "audio" : {
          "codec" : "codec",
          "bitrate" : 2,
          "url" : "http://example.com/aeiou"
        },
        "title" : "title",
        "durationSec" : 5,
        "lyrics" : {
          "language" : "language",
          "text" : "text"
        },
        "updatedAt" : "2000-01-23T04:56:07.000+00:00"
      } ],
      "tags" : [ "tags", "tags" ],
      "cover" : {
        "alt" : "alt",
        "width" : 6,
        "url" : "http://example.com/aeiou",
        "height" : 1
      },
      "createdAt" : "2000-01-23T04:56:07.000+00:00",
      "stats" : {
        "playCount" : 9,
        "likeCount" : 3,
        "ratingAvg" : 4.5,
        "commentCount" : 2
      },
      "price" : 0.8008282,
      "genres" : [ "genres", "genres" ],
      "currency" : "EUR",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "releaseState" : "draft",
      "updatedAt" : "2000-01-23T04:56:07.000+00:00"
    } ],
    "artists" : [ {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    }, {
      "name" : "name",
      "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    } ],
    "name" : "name",
    "description" : "description",
    "id" : "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
    "url" : "http://example.com/aeiou",
    "updatedAt" : "2000-01-23T04:56:07.000+00:00"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

