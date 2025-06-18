export default defineEventHandler(async (event) => {
  try {
    // Get the complete session including secure data
    const session = await getUserSession(event);

    // Return the full session object
    return {
      success: true,
      session: session,
      // Include secure fields that might be filtered in client-side session
      secure: session.secure || null,
      // Return timestamp for session validation
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    // Handle authentication errors
    console.error("Session retrieval error:", error);

    return {
      success: false,
      session: null,
      secure: null,
      error: "Failed to retrieve session",
      timestamp: new Date().toISOString()
    };
  }
});
