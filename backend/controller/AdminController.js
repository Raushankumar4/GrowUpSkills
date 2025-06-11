import { Payment } from "../models/PaymentSchema.js";
import User from "../models/user.model.js";



export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user;
    const payments = await Payment.find({ user: userId })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export const getRevenueStats = async (req, res) => {
  try {
    const matchStage = { status: "success" };

    // Weekly revenue: group by week number and year
    const weeklyRevenue = await Payment.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.week": -1 } },
    ]);

    // Monthly revenue: group by month and year
    const monthlyRevenue = await Payment.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    // Yearly revenue: group by year
    const yearlyRevenue = await Payment.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1 } },
    ]);

    res.json({ weeklyRevenue, monthlyRevenue, yearlyRevenue });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch revenue" });
  }
};

export const getCourseRevenueWithBuyers = async (req, res) => {
  try {
    const revenueByCourse = await Payment.aggregate([
      { $match: { status: "success" } },

      // Group by course and collect user IDs and total revenue
      {
        $group: {
          _id: "$course",
          totalRevenue: { $sum: "$amount" },
          totalPurchases: { $sum: 1 },
          users: { $addToSet: "$user" }, // collect unique users
        },
      },

      // Lookup course details
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },

      // Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "buyers",
        },
      },

      {
        $project: {
          _id: 0,
          courseId: "$courseDetails._id",
          title: "$courseDetails.title",
          totalRevenue: 1,
          totalPurchases: 1,
          buyers: {
            _id: 1,
            username: 1,
            email: 1,
            enrollement: 1,
            studentID: 1,
          },
        },
      },

      { $sort: { totalRevenue: -1 } },
    ]);

    res.json({ success: true, revenueByCourse: revenueByCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get course revenue and buyers",
    });
  }
};

export const getCourseRevenue = async (req, res) => {
  try {
    const revenueByCourse = await Payment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: "$course",
          totalRevenue: { $sum: "$amount" },
          totalPurchases: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $project: {
          _id: 0,
          courseId: "$courseDetails._id",
          title: "$courseDetails.title",
          totalRevenue: 1,
          totalPurchases: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.json({ success: true, revenueByCourse });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch course revenue" });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select(
      "username displayName"
    );
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch students", error });
  }
};

export const totalEnrollStudent = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      {
        $match: {
          status: "success",
          purchaseConfirmedAt: { $ne: null },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$purchaseConfirmedAt" },
            month: { $month: "$purchaseConfirmedAt" },
            course: "$course",
          },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id.course",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          courseId: "$_id.course",
          count: 1,
          courseTitle: { $arrayElemAt: ["$courseInfo.title", 0] },
          _id: 0,
        },
      },
      { $sort: { year: 1, month: 1 } },
    ]);

    return res.status(200).json(stats);
  } catch (err) {
    console.error("Error getting monthly enrollments:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getMonthlyStudentSignups = async (req, res) => {
  try {
    const data = await User.aggregate([
      { $match: { role: "Student" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          students: { $push: "$username" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedData = Array(12)
      .fill(null)
      .map(() => ({ count: 0, students: [] }));

    data.forEach((item) => {
      formattedData[item._id - 1] = {
        count: item.students.length,
        students: item.students,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching signup data", error });
  }
};
