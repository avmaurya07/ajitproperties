import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    // Find distinct locations that match the query
    // Using regex for case-insensitive partial match
    const locations = await Property.find({
      location: { $regex: query, $options: "i" },
    }).distinct("location");

    // Limit suggestions to top 10 to avoid overwhelming the UI
    const limitedLocations = locations.slice(0, 10);

    return NextResponse.json(limitedLocations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}
