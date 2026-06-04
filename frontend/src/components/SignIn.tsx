import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "./ui/button";
import Card from "./ui/card";
import { isValidUserSession } from "./protectedRouter";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  ShieldCheck,
  Link2,
  Play,

} from "lucide-react";
import {
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidUserSession()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const responseGoogle = async (authResult: any) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        const token = result.data.token;

        localStorage.setItem(
          "user-info",
          JSON.stringify({ email, name, image, token, isLogIn: true })
        );

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#F8FAFC] dark:bg-[#020617] flex items-center justify-center px-3 sm:px-4 transition-colors duration-300">
      <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(67,86,214,0.25),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.18),transparent_30%)]" />

      <Button
        variant="none"
        size="none"
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 flex items-center gap-2 rounded-full bg-white/80 dark:bg-[#0F172A]/80 border border-[#E2E8F0] dark:border-[#1E293B] px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-[#4356D6] transition"
      >
        <ArrowLeft size={17} />
        Home
      </Button>

      <section className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="hidden lg:flex relative mx-auto w-full max-w-[420px] lg:max-w-[460px] h-[320px] lg:h-[460px] rounded-full bg-[#4356D6]/10 border border-[#4356D6]/20 items-center justify-center">
          <div className="absolute w-[260px] lg:w-[360px] h-[260px] lg:h-[360px] rounded-full border border-[#4356D6]/30" />
          <div className="absolute w-[180px] lg:w-[250px] h-[180px] lg:h-[250px] rounded-full border border-[#4356D6]/40" />

          <FloatingCard className="top-5 left-3 lg:top-8 lg:left-4" icon={<FaYoutube size={18} />} text="YouTube saved" />
          <FloatingCard className="top-14 right-0 lg:top-20" icon={<FaGithub size={18} />} text="GitHub repo" />
          <FloatingCard className="bottom-16 left-0 lg:bottom-24" icon={<Link2 size={18} />} text="Article link" />
          <FloatingCard className="bottom-6 right-4 lg:bottom-10 lg:right-6" icon={<Play size={18} />} text="Watch later" />

          <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-[32px] lg:rounded-[42px] bg-[#4356D6] flex items-center justify-center shadow-2xl shadow-[#4356D6]/40">
            <Brain size={60} className="text-white lg:hidden" />
            <Brain size={90} className="text-white hidden lg:block" />
          </div>
        </div>

        <Card variant="none" size="none" className="w-full max-w-[560px] mx-auto rounded-[24px] sm:rounded-[36px] bg-white/85 dark:bg-[#0F172A]/85 backdrop-blur-2xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-2xl px-5 py-5 sm:p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF2FF] dark:bg-[#1E293B] flex items-center justify-center">
              <Brain size={28} className="text-[#4356D6]" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Second Brain
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Your digital memory vault
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] dark:bg-[#1E293B] px-3 py-2 text-xs sm:text-sm font-semibold text-[#4356D6] mb-4">
            <Sparkles size={15} />
            Smart knowledge access
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Welcome back to your brain.
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400">
            Sign in and continue organizing your best links, videos, posts and
            useful resources.
          </p>

          <Button
            variant="none"
            size="none"
            onClick={() => googleLogin()}
            className="group cursor-pointer mt-5 sm:mt-7 w-full h-12 sm:h-14 rounded-2xl bg-[#4356D6] text-white font-semibold flex items-center justify-center gap-3 shadow-xl shadow-[#4356D6]/25 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>

          <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            <SmallStat icon={<ShieldCheck size={18} />} title="Secure" desc="Login" />
            <SmallStat icon={<Link2 size={18} />} title="Organized" desc="Links" />
            <SmallStat icon={<Sparkles size={18} />} title="Clean" desc="UI" />
          </div>

          <p className="mt-5 sm:mt-6 text-center text-[10px] sm:text-xs text-gray-400">
            © 2026 Second Brain by Tanishq Kushwah
          </p>
        </Card>
      </section>
    </main>
  );
}

function FloatingCard({
  icon,
  text,
  className,
}: {
  icon: React.ReactNode;
  text: string;
  className: string;
}) {
  return (
    <Card variant="none" size="none"
      className={`absolute ${className} rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] shadow-xl px-3 lg:px-4 py-2 lg:py-3 flex items-center gap-2 lg:gap-3 text-gray-700 dark:text-gray-200`}
    >
      <span className="text-[#4356D6]">{icon}</span>
      <span className="text-xs lg:text-sm font-semibold">{text}</span>
    </Card>
  );
}

function SmallStat({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card variant="none" size="none" className="rounded-xl sm:rounded-2xl bg-[#F8FAFC] dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] p-2.5 sm:p-4">
      <div className="text-[#4356D6] mb-1 sm:mb-2">{icon}</div>
      <h3 className="font-semibold text-xs sm:text-base text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
        {desc}
      </p>
    </Card>
  );
}

export default SignIn;