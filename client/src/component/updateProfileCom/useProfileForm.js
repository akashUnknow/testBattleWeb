import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number too long."),
});

export const useProfileForm = (user, userId, API_URL, setLoading) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      totalScore: 0,
      testsCompleted: 0,
      rank: 0,
    },
  });

  useEffect(() => {
    if (!userId) return;

    form.reset({
      name: user?.name || "",
      phoneNumber: user?.phoneNumber?.toString() || "",
      email: user?.email || "",
      totalScore: user?.totalScore || 0,
      testsCompleted: user?.testsCompleted || 0,
      rank: user?.rank || 0,
    });

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/users/${userId}`);
        const data = await res.json();
        form.setValue("totalScore", data.totalScore || 0);
        form.setValue("testsCompleted", data.testsCompleted || 0);
        form.setValue("rank", data.rank || 0);
        form.setValue("phoneNumber", data.phoneNumber || "");
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, userId, API_URL, setLoading]);

  return form;
};