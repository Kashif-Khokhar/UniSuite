import { Mail, Phone, Clock, MessageSquare } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import AccentCard from "@/components/dashboard/AccentCard";

export default function StudentSupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Student Support Office"
        description="Get in touch with the student support team for help with any issue."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AccentCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-medium text-slate-900">support@university.edu.pk</p>
            </div>
          </div>
        </AccentCard>
        <AccentCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Phone</p>
              <p className="text-sm font-medium text-slate-900">+92 42 111 555 666</p>
            </div>
          </div>
        </AccentCard>
        <AccentCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Office Hours</p>
              <p className="text-sm font-medium text-slate-900">Mon – Fri, 9:00 AM – 5:00 PM</p>
            </div>
          </div>
        </AccentCard>
        <AccentCard>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Live Chat</p>
              <p className="text-sm font-medium text-slate-900">Available during office hours</p>
            </div>
          </div>
        </AccentCard>
      </div>
    </div>
  );
}
