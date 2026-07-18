"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Contact as ContactIcon,
  Home,
  Cake,
  Users,
  CreditCard,
  Map,
  Flag,
  Droplet,
  Heart,
  Pencil,
} from "lucide-react";
import { formatDate, ordinal } from "@/lib/format";
import { getAvatarUrl } from "@/lib/avatar";

interface StudentProfile {
  name: string;
  fatherName: string | null;
  rollNumber: string;
  email: string;
  program: string;
  faculty: string | null;
  career: string | null;
  currentSemester: number;
  cgpa: number;
  dob: string | null;
  gender: string | null;
  cnic: string | null;
  domicile: string | null;
  nationality: string | null;
  religion: string | null;
  bloodGroup: string | null;
  fatherCnic: string | null;
  maritalStatus: string | null;
  contact: string | null;
  emergencyContact: string | null;
  presentAddress: string | null;
  permanentAddress: string | null;
}

type Tab = "about" | "bioData";

export default function ProfilePage() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("about");

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setStudent(json.student))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading profile...</div>;
  }

  if (!student) {
    return <div className="text-sm text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative bg-gradient-to-br from-brand-700 to-brand-600 px-6 pb-6 pt-6 text-white sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- external placeholder photo, not worth Image config */}
          <img
            src={getAvatarUrl(student.rollNumber)}
            alt={student.name}
            className="h-20 w-20 shrink-0 rounded-full border-4 border-white/30 object-cover"
          />
          <div>
            <p className="text-lg font-semibold sm:text-xl">
              {student.rollNumber}-{student.name}
            </p>
            <p className="text-sm text-brand-100">{student.rollNumber}</p>
            {student.faculty && <p className="text-sm text-brand-100">{student.faculty}</p>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <HeaderStat value={student.career ?? "—"} label="Career" />
          <HeaderStat value={student.program} label="Program" />
          <HeaderStat value={ordinal(student.currentSemester)} label="Current Semester" />
        </div>

        <button
          type="button"
          title="Edit profile"
          className="absolute -bottom-5 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg ring-4 ring-white transition-colors hover:bg-brand-400 sm:right-8"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="px-6 pt-8 sm:px-8">
        <div className="flex gap-6 border-b border-slate-200">
          <TabButton active={tab === "about"} onClick={() => setTab("about")}>
            About
          </TabButton>
          <TabButton active={tab === "bioData"} onClick={() => setTab("bioData")}>
            Bio Data
          </TabButton>
        </div>

        <div className="py-6 pb-8">
          {tab === "about" ? (
            <div>
              <h2 className="mb-1 text-sm font-semibold text-slate-700">Contact Information</h2>
              <div className="max-w-xl">
                <InfoRow icon={Mail} label="Email" value={student.email} />
                <InfoRow icon={Phone} label="Phone" value={student.contact} />
                <InfoRow icon={ContactIcon} label="Emergency Contact" value={student.emergencyContact} />
                <InfoRow icon={Home} label="Present Address" value={student.presentAddress} />
                <InfoRow
                  icon={Home}
                  label="Permanent Address"
                  value={student.permanentAddress}
                  last
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              <div>
                <h2 className="mb-1 text-sm font-semibold text-slate-700">Personal Detail</h2>
                <div>
                  <InfoRow
                    icon={Cake}
                    label="Date of Birth"
                    value={student.dob ? formatDate(student.dob) : null}
                  />
                  <InfoRow icon={Users} label="Gender" value={student.gender} />
                  <InfoRow icon={CreditCard} label="CNIC" value={student.cnic} />
                  <InfoRow icon={Map} label="Domicile" value={student.domicile} />
                  <InfoRow icon={Flag} label="Nationality" value={student.nationality} />
                  <InfoRow icon={Users} label="Religion" value={student.religion} />
                  <InfoRow icon={Droplet} label="Blood Group" value={student.bloodGroup} last />
                </div>
              </div>

              <div>
                <h2 className="mb-1 text-sm font-semibold text-slate-700">Family Detail</h2>
                <div>
                  <InfoRow icon={Users} label="Father Name" value={student.fatherName} />
                  <InfoRow icon={CreditCard} label="Father/Guardian CNIC" value={student.fatherCnic} />
                  <InfoRow icon={Heart} label="Marital Status" value={student.maritalStatus} last />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeaderStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-base font-semibold sm:text-lg">{value}</p>
      <p className="text-xs text-brand-100">{label}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
        active
          ? "border-brand-600 text-brand-700"
          : "border-transparent text-slate-400 hover:text-slate-600"
      }`}
    >
      {children}
    </button>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  last = false,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | null;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 py-3 ${last ? "" : "border-b border-slate-100"}`}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={16} />
      </div>
      {value ? (
        <div>
          <p className="text-sm font-medium text-slate-900">{value}</p>
          <p className="text-xs text-slate-400">{label}</p>
        </div>
      ) : (
        <p className="text-sm text-slate-400">{label}</p>
      )}
    </div>
  );
}
