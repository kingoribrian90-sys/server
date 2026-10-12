const Houseowner = require('../models/Houseowner');
const Tenantsearch = require('../models/Tenantsearch');

exports.getListings = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 12);

  if (!Number.isInteger(page) || page < 1 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      error: 'page must be a positive integer and limit must be between 1 and 100',
    });
  }

  const filter = { status: 'active' };
  if (req.query.county) filter.county = String(req.query.county).trim();
  if (req.query.locality) filter.locality = String(req.query.locality).trim();

  const minimum = req.query.minRent === undefined
    ? undefined
    : Number(req.query.minRent);
  const maximum = req.query.maxRent === undefined
    ? undefined
    : Number(req.query.maxRent);
  const exactRent = req.query.rent === undefined
    ? undefined
    : Number(req.query.rent);

  if ([minimum, maximum, exactRent].some((value) =>
    value !== undefined && (!Number.isFinite(value) || value < 0))) {
    return res.status(400).json({ error: 'rent filters must be non-negative numbers' });
  }

  if (exactRent !== undefined) {
    filter.monthlybudget = exactRent;
  } else if (minimum !== undefined || maximum !== undefined) {
    filter.monthlybudget = {};
    if (minimum !== undefined) filter.monthlybudget.$gte = minimum;
    if (maximum !== undefined) filter.monthlybudget.$lte = maximum;
  }

  const [listings, total] = await Promise.all([
    Houseowner.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Houseowner.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: listings,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
};

exports.postTenantSearch = async (req, res) => {
  const search = await Tenantsearch.create({
    county: req.body.county,
    locality: req.body.locality,
    budgetrange: req.body.budgetrange || req.body.budgetRange,
  });

  res.status(201).json({ success: true, data: search });
};
