"use strict";
let prisma;
try {
  const prismaModule = require("../src/db/prisma");
  prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
  if (!prisma) {
    const { PrismaClient } = require("@prisma/client");
    prisma = new PrismaClient();
  }
} catch (e) {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
}

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
exports.commentsCommentIdDELETE = async function (commentId) {
  try {
    await prisma.comment.delete({ where: { id: commentId } });
    return { meta: { deleted: true, id: commentId } };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

/**
 * Detalle de comentario
 *
 * commentId UUID
 * returns CommentResponse
 **/
exports.commentsCommentIdGET = async function (commentId) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      return { error: "Comentario no encontrado", statusCode: 404 };
    }
    return { data: comment };
  } catch (error) {
    console.error("Error fetching comment detail:", error);
    throw error;
  }
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
exports.commentsCommentIdPATCH = async function (body, commentId) {
  try {
    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: {
        text: body?.text ?? undefined,
        status: body?.status ?? undefined,
        rating: body?.rating ?? undefined,
      },
    });
    return { data: updated };
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
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
exports.commentsGET = async function (page, limit, targetType, targetId, status, q) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = {};
  if (targetType) where.targetType = targetType;
  if (targetId) where.targetId = targetId;
  if (status) where.status = status;
  if (q) where.text = like(q);

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
    console.error("Error fetching global comments:", error);
    throw error;
  }
};

/**
 * Crear comentario global
 *
 * body CommentCreateInput
 * returns CommentResponse
 **/
exports.commentsPOST = async function (body) {
 try {
    if (!body?.targetType || !body?.targetId) {
      return { error: "Faltan targetType o targetId", statusCode: 400 };
    }
    const created = await prisma.comment.create({
      data: {
        targetType: body.targetType,
        targetId: body.targetId,
        text: body?.text ?? null,
        rating: body?.rating ?? null,
        userId: body?.userId ?? null,
        status: "visible",
      },
    });
    return { data: created };
  } catch (error) {
    console.error("Error creating global comment:", error);
    throw error;
  }
};

/**
 * Listar comentarios de un producto
 *
 * merchId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
exports.merchMerchIdCommentsGET = async function (merchId, page, limit) {
  console.log(
    "Fetching comments for merch:",
    merchId,
    "page:",
    page,
    "limit:",
    limit
  );

  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { targetType: "merch", targetId: merchId };
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
};

/**
 * Comentar en un producto
 *
 * body CommentCreateInput
 * merchId UUID
 * returns CommentResponse
 **/
exports.merchMerchIdCommentsPOST = async function (body, merchId) {
  try {
    const created = await prisma.comment.create({
      data: {
        targetType: "merch",
        targetId: merchId,
        text: body?.text ?? null,
        rating: body?.rating ?? null,
        userId: body?.userId ?? null,
        status: "visible",
      },
    });
    return { data: created };
  } catch (error) {
    console.error("Error creating merch comment:", error);
    throw error;
  }
};

/**
 * Listar comentarios de una pista
 *
 * trackId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
exports.tracksTrackIdCommentsGET = async function (trackId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { targetType: "track", targetId: trackId };
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
};

/**
 * Comentar en una pista
 *
 * body CommentCreateInput
 * trackId UUID
 * returns CommentResponse
 **/
exports.tracksTrackIdCommentsPOST = async function (body, trackId) {
  try {
    const created = await prisma.comment.create({
      data: {
        targetType: "track",
        targetId: trackId,
        text: body?.text ?? null,
        rating: body?.rating ?? null,
        userId: body?.userId ?? null,
        status: "visible",
      },
    });
    return { data: created };
  } catch (error) {
    console.error("Error creating track comment:", error);
    throw error;
  }
};
