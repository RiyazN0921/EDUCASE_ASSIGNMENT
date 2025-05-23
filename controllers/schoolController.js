const School = require('../models/schoolModel')

const { successResponse, errorResponse } = require('../utils/helper')

const { calculateDistance } = require('../utils/helper')

/**
 * Add a new school
 * @route POST /api/schools/addSchool
 */
exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body

    if (!name || !address || !latitude || !longitude) {
      return errorResponse(res, 'All fields are required', 400)
    }

    const school = await School.create({ name, address, latitude, longitude })

    successResponse(res, 'School added successfully', school)
  } catch (error) {
    console.error('Error adding school:', error)
    errorResponse(res, 'Failed to add school', 500)
  }
}

/**
 * List schools sorted by proximity
 * @route GET /api/schools/listSchools
 * @query {latitude, longitude} User's location
 */
exports.listSchools = async (req, res) => {
  try {
    let { latitude, longitude } = req.query

    if (!latitude || !longitude) {
      return errorResponse(res, 'Latitude and Longitude are required', 400)
    }

    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)

    if (isNaN(latitude) || isNaN(longitude)) {
      return errorResponse(res, 'Invalid latitude or longitude format', 400)
    }

    const schools = await School.findAll()

    if (!schools.length) {
      return successResponse(res, 'No schools found', [])
    }

    const sortedSchools = schools
      .map((school) => ({
        ...school.dataValues,
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)

    return successResponse(res, 'Schools fetched successfully', sortedSchools)
  } catch (error) {
    console.error('Error fetching schools:', error)
    return errorResponse(res, 'Failed to fetch schools', 500)
  }
}