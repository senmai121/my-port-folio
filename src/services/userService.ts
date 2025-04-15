export const fetchUserData = async (userId: string) => {
    const res = await fetch(`/api/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user data");
    return res.json();
  };
  