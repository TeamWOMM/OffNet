import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Return success response
    return NextResponse.json(
      { success: true, ...responseData },
      { status: 200 }
    );

  } catch (error) {
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing request',
        error: error.message 
      },
      { status: 500 }
    );
  }
}