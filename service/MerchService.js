"use strict";

/**
 * Listar productos de merchandising
 *
 * page Integer  (optional)
 * limit Integer  (optional)
 * artistId UUID  (optional)
 * labelId UUID  (optional)
 * type String Tipo de producto (optional)
 * availability String  (optional)
 * sort String Campo de ordenación (optional)
 * order String  (optional)
 * q String  (optional)
 * returns PaginatedMerchList
 **/
exports.merchGET = async function (
  page,
  limit,
  artistId,
  labelId,
  type,
  availability,
  sort,
  order,
  q
) {
  try {
    // Implementación usando Prisma: listado paginado y filtros básicos
    const { PrismaClient } = require("@prisma/client");
    // prisma robust loader (reuse global if exists)
    let prisma;
    try {
      const prismaModule = require("../src/db/prisma");
      prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
      if (!prisma) prisma = new PrismaClient();
    } catch (e) {
      prisma = new PrismaClient();
    }

    const toInt = (v, def) => {
      const n = parseInt(v, 10);
      return Number.isFinite(n) && n > 0 ? n : def;
    };

    const pageNum = toInt(page, 1);
    const pageSize = toInt(limit, 20);
    const skip = (pageNum - 1) * pageSize;

    const where = {};
    if (artistId) where.artistId = artistId;
    if (labelId) where.labelId = labelId;
    if (typeof availability !== "undefined") {
      // availability can be 'in_stock' or other; map to stock>0
      if (String(availability).toLowerCase() === "in_stock")
        where.stock = { gt: 0 };
    }
    if (q)
      where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
    if (type) {
      // map OpenAPI 'type' (spanish) to Prisma MerchCategory
      const mapType = (t) => {
        if (!t) return undefined;
        const s = String(t).toLowerCase();
        switch (s) {
          case "camiseta":
            return "SHIRT";
          case "hoody":
          case "hoodie":
            return "HOODIE";
          case "vinilo":
            return "VINYL";
          case "cd":
            return "CD";
          case "poster":
            return "POSTER";
          case "pegatina":
            return "STICKER";
          case "otro":
            return "OTHER";
          default:
            return String(t).toUpperCase();
        }
      };
      const cat = mapType(type);
      if (cat) where.category = cat;
    }

    const sortMap = {
      price: "priceCents",
      name: "title",
    }

    const sortField = sortMap[sort] || sort || "createdAt";
    const sortOrder =
      order && String(order).toLowerCase() === "asc" ? "asc" : "desc";

    const [rows, total] = await Promise.all([
      prisma.merchItem.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip,
        take: pageSize,
      }),
      prisma.merchItem.count({ where }),
    ]);

    // Enrich with cover image objects (batch fetch by coverId)
    const coverIds = rows.map(r => r.coverId).filter(Boolean);
    let coverMap = new Map();
    if (coverIds.length) {
      const images = await prisma.image.findMany({ where: { id: { in: coverIds } } });
      coverMap = new Map(images.map(img => [img.id, img]));
    }
    const data = rows.map(r => (coverMap.size && r.coverId ? { ...r, cover: coverMap.get(r.coverId) || null } : r));

    return { data, meta: { total, page: pageNum, limit: pageSize } };
  } catch (err) {
    console.error("[merchGET] error", err?.message || err);
    // Devolver error controlado para que Swagger muestre un mensaje legible
    return {
      data: { message: err?.message || "Internal Server Error" },
      status: 500,
    };
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
 * Eliminar producto
 *
 * merchId UUID
 * no response value expected for this operation
 **/
exports.merchMerchIdDELETE = async function (merchId) {
  // Borrado duro; si prefieres soft-delete, cambia a una actualización de 'active'
  try {
    const { PrismaClient } = require("@prisma/client");
    let prisma;
    try {
      const prismaModule = require("../src/db/prisma");
      prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
      if (!prisma) prisma = new PrismaClient();
    } catch (e) {
      prisma = new PrismaClient();
    }
    return prisma.merchItem
      .delete({ where: { id: merchId } })
      .then(() => undefined);
  } catch (err) {
    console.error("[merchMerchIdDELETE] error", err?.message || err);
    throw err;
  }
};

/**
 * Detalle de producto
 *
 * merchId UUID
 * returns MerchResponse
 **/
exports.merchMerchIdGET = async function (merchId) {
  // Obtener detalle desde BD
  const { PrismaClient } = require("@prisma/client");
  let prisma;
  try {
    const prismaModule = require("../src/db/prisma");
    prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
    if (!prisma) prisma = new PrismaClient();
  } catch (e) {
    prisma = new PrismaClient();
  }

  const merch = await prisma.merchItem.findUnique({
    where: { id: merchId },
  });
  if (!merch) {
    const err = new Error("Merch not found");
    err.status = 404;
    throw err;
  }
  if (merch.coverId) {
    try {
      const cover = await prisma.image.findUnique({ where: { id: merch.coverId } });
      return { data: { ...merch, cover } };
    } catch (_) {
      // Fall back to base merch if cover lookup fails
      return { data: merch };
    }
  }
  return { data: merch };
};

/**
 * Subir imágenes del producto
 *
 * merchId UUID
 * returns MerchResponse
 **/
exports.merchMerchIdImagesPOST = async function (merchId) {
  // Crear imagen y asignarla como portada (cover) del merch
  const { PrismaClient } = require("@prisma/client");
  let prisma;
  try {
    const prismaModule = require("../src/db/prisma");
    prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
    if (!prisma) prisma = new PrismaClient();
  } catch (e) {
    prisma = new PrismaClient();
  }

  // Creamos una imagen mínima; en un endpoint real deberías aceptar body con url/alt/size
  const createdImage = await prisma.image.create({
    data: { url: "", alt: "merch", width: null, height: null },
  });

  const updated = await prisma.merchItem.update({
    where: { id: merchId },
    data: { coverId: createdImage.id },
  });
  return { data: updated };
};

/**
 * Actualizar producto
 *
 * body MerchUpdateInput
 * merchId UUID
 * returns MerchResponse
 **/
exports.merchMerchIdPATCH = async function (body, merchId) {
  // Actualización parcial del merch
  const { PrismaClient } = require("@prisma/client");
  let prisma;
  try {
    const prismaModule = require("../src/db/prisma");
    prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
    if (!prisma) prisma = new PrismaClient();
  } catch (e) {
    prisma = new PrismaClient();
  }

  const patch = {};
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "name"))
    patch.title = body.name;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "description"))
    patch.description = body.description;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "type") && body.type) {
    // map API type -> enum
    const mapType = (t) => {
      if (!t) return undefined;
      const s = String(t).toLowerCase();
      switch (s) {
        case "camiseta":
          return "SHIRT";
        case "hoody":
        case "hoodie":
          return "HOODIE";
        case "vinilo":
          return "VINYL";
        case "cd":
          return "CD";
        case "poster":
          return "POSTER";
        case "pegatina":
          return "STICKER";
        case "otro":
          return "OTHER";
        default:
          return String(t).toUpperCase();
      }
    };
    patch.category = mapType(body.type);
  }
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "price"))
    patch.priceCents = body.price
      ? Math.round(Number(body.price) * 100)
      : undefined;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "currency"))
    patch.currency = body.currency;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "stock"))
    patch.stock = typeof body.stock === "number" ? body.stock : undefined;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "sku"))
    patch.sku = body.sku;
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "active"))
    patch.active = !!body.active;

  // IDs de referencia (sin relaciones FK)
  if (body?.artistId) patch.artistId = body.artistId;
  if (body?.labelId) patch.labelId = body.labelId;
  
  // Cover: si se envía coverId lo asignamos directamente (sin FK)
  if (body?.coverId) patch.coverId = body.coverId;

  Object.keys(patch).forEach((k) => patch[k] === undefined && delete patch[k]);

  const updated = await prisma.merchItem.update({
    where: { id: merchId },
    data: patch,
  });
  return { data: updated };
};

/**
 * Listar variantes de un producto
 *
 * merchId UUID
 * returns inline_response_200_1
 **/
exports.merchMerchIdVariantsGET = function (merchId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          color: "color",
          size: "size",
          price: 0.8008282,
          currency: "EUR",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          sku: "sku",
          stock: 6,
        },
        {
          color: "color",
          size: "size",
          price: 0.8008282,
          currency: "EUR",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          sku: "sku",
          stock: 6,
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
 * Crear variante
 *
 * body VariantCreateInput
 * merchId UUID
 * returns inline_response_201
 **/
exports.merchMerchIdVariantsPOST = function (body, merchId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        color: "color",
        size: "size",
        price: 0.8008282,
        currency: "EUR",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        sku: "sku",
        stock: 6,
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
 * Eliminar variante
 *
 * merchId UUID
 * variantId UUID
 * no response value expected for this operation
 **/
exports.merchMerchIdVariantsVariantIdDELETE = function (merchId, variantId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Actualizar stock/precio de variante
 *
 * body VariantUpdateInput
 * merchId UUID
 * variantId UUID
 * returns inline_response_201
 **/
exports.merchMerchIdVariantsVariantIdPATCH = function (
  body,
  merchId,
  variantId
) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        color: "color",
        size: "size",
        price: 0.8008282,
        currency: "EUR",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        sku: "sku",
        stock: 6,
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
 * Crear producto de merchandising
 *
 * body MerchCreateInput
 * returns MerchResponse
 **/
exports.merchPOST = async function (body) {
  // Crear merch y persistir en BD usando Prisma
  try {
    const { PrismaClient } = require("@prisma/client");
    let prisma;
    try {
      const prismaModule = require("../src/db/prisma");
      prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
      if (!prisma) prisma = new PrismaClient();
    } catch (e) {
      prisma = new PrismaClient();
    }

    const {
      name,
      description = null,
      type = "otro",
      price = 0,
      currency = "EUR",
      stock = 0,
      sku = null,
      active = true,
      artistId = null,
      labelId = null,
      cover = null,
    } = body || {};

    if (!name) return { data: { message: "name is required" }, status: 400 };
    if (!type) return { data: { message: "type is required" }, status: 400 };

    const priceCents = Math.round(Number(price || 0) * 100);

    const mapType = (t) => {
      if (!t) return "OTHER";
      const s = String(t).toLowerCase();
      switch (s) {
        case "camiseta":
          return "SHIRT";
        case "hoody":
        case "hoodie":
          return "HOODIE";
        case "vinilo":
          return "VINYL";
        case "cd":
          return "CD";
        case "poster":
          return "POSTER";
        case "pegatina":
          return "STICKER";
        case "otro":
          return "OTHER";
        default:
          return String(t).toUpperCase();
      }
    };

    const data = {
      title: name,
      description,
      category: mapType(type),
      priceCents,
      currency,
      stock: typeof stock === "number" ? stock : Number(stock) || 0,
      sku: sku || undefined,
      active: !!active,
    };

    // Asignar IDs directamente sin relaciones FK (igual que en Album)
    if (artistId) data.artistId = artistId;
    if (labelId) data.labelId = labelId;
    
    // Cover: si se envía coverId lo asignamos (sin FK, es solo un string)
    if (cover?.id) data.coverId = cover.id;

    const created = await prisma.merchItem.create({
      data,
    });
    return { data: created, status: 201 };
  } catch (err) {
    console.error("[merchPOST] error", err?.code || err?.message || err);
    return { data: { message: "Internal Server Error" }, status: 500 };
  }
};
