"use strict";

/**
 * Listar comentarios del álbum
 *
 * albumId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
const toInt = (v, def) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

const buildInclude = (includeCsv) => {
  if (!includeCsv) return undefined;
  const parts = String(includeCsv)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const include = {};
  const allowed = ["tracks", "label", "stats", "artist", "cover"];
  for (const p of parts) if (allowed.includes(p)) include[p] = true;
  return Object.keys(include).length ? include : undefined;
};

const like = (q) => ({ contains: q.toLowerCase() });

exports.albumsAlbumIdCommentsGET = async function (albumId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;
  const where = { targetType: "album", targetId: albumId };

  try {
    const [data, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.comment.count({ where }),
    ]);
    return { data, meta: { total, page: pageNum, limit: pageSize } };
  } catch (error) {
    console.error("Error fetching album comments:", error);
    throw error;
  }
};

/**
 * Comentar en un álbum
 *
 * body CommentCreateInput
 * albumId UUID
 * returns CommentResponse
 **/
exports.albumsAlbumIdCommentsPOST = async function (body, albumId) {
  try {
    const created = await prisma.comment.create({
      data: {
        targetType: "album",
        targetId: albumId,
        text: body?.text ?? null,
        rating: body?.rating ?? null,
        userId: body?.userId ?? null,
        status: "visible",
      },
    });
    console.log("Created comment:", created);
    return { data: created };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

/**
 * Eliminar comentario
 *
 * commentId UUID
 * no response value expected for this operation
 **/
exports.commentsCommentIdDELETE = function (commentId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Detalle de comentario
 *
 * commentId UUID
 * returns CommentResponse
 **/
exports.commentsCommentIdGET = function (commentId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Quitar like a un comentario
 *
 * commentId UUID
 * no response value expected for this operation
 **/
exports.commentsCommentIdLikeDELETE = function (commentId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Dar like a un comentario
 *
 * commentId UUID
 * no response value expected for this operation
 **/
exports.commentsCommentIdLikePOST = function (commentId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Editar comentario (texto/estado)
 *
 * body Comments_commentId_body
 * commentId UUID
 * returns CommentResponse
 **/
exports.commentsCommentIdPATCH = function (body, commentId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Listar respuestas de un comentario (hilo)
 *
 * commentId UUID
 * returns inline_response_200_3
 **/
exports.commentsCommentIdRepliesGET = function (commentId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
      ],
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Responder a un comentario
 *
 * body CommentId_replies_body
 * commentId UUID
 * returns CommentResponse
 **/
exports.commentsCommentIdRepliesPOST = function (body, commentId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Reportar comentario
 *
 * body CommentId_report_body
 * commentId UUID
 * no response value expected for this operation
 **/
exports.commentsCommentIdReportPOST = function (body, commentId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Listar comentarios globales
 *
 * page Integer  (optional)
 * limit Integer  (optional)
 * targetType String  (optional)
 * targetId UUID  (optional)
 * status String  (optional)
 * q String  (optional)
 * returns PaginatedCommentList
 **/
exports.commentsGET = function (page, limit, targetType, targetId, status, q) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
      ],
      meta: {
        total: 123,
        limit: 20,
        page: 1,
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Crear comentario global
 *
 * body CommentCreateInput
 * returns CommentResponse
 **/
exports.commentsPOST = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Listar comentarios de un producto
 *
 * merchId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
exports.merchMerchIdCommentsGET = function (merchId, page, limit) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
      ],
      meta: {
        total: 123,
        limit: 20,
        page: 1,
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Comentar en un producto
 *
 * body CommentCreateInput
 * merchId UUID
 * returns CommentResponse
 **/
exports.merchMerchIdCommentsPOST = function (body, merchId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Listar comentarios de una pista
 *
 * trackId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
exports.tracksTrackIdCommentsGET = function (trackId, page, limit) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
      ],
      meta: {
        total: 123,
        limit: 20,
        page: 1,
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Comentar en una pista
 *
 * body CommentCreateInput
 * trackId UUID
 * returns CommentResponse
 **/
exports.tracksTrackIdCommentsPOST = function (body, trackId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
