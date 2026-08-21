"use client";

import { useState, useRef } from "react";
import { 
  Camera, 
  User, 
  Key, 
  Phone, 
  Globe, 
  ShieldCheck,
  Mail,
  ChevronDown,
  Move,
  Trash2,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

export default function TeacherProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  // Cover Photo Adjustment State
  const [isAdjustingCover, setIsAdjustingCover] = useState(false);
  const [coverPositionY, setCoverPositionY] = useState(50);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  // Profile Photo State
  const [isEditingProfilePhoto, setIsEditingProfilePhoto] = useState(false);

  const { showToast } = useToast();

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImage(url);
      setIsEditingProfilePhoto(true);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCoverImage(url);
      setIsAdjustingCover(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isAdjustingCover) return;
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isAdjustingCover || dragStartY === null) return;
    const deltaY = e.clientY - dragStartY;
    // Calculate percentage change based on a fixed container height
    const percentageChange = (deltaY / 192) * 100;
    
    setCoverPositionY((prev) => {
      let next = prev - percentageChange;
      if (next < 0) next = 0;
      if (next > 100) next = 100;
      return next;
    });
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    if (!isAdjustingCover) return;
    setDragStartY(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account settings, preferences, and security.</p>
      </div>

      {/* Top Card: Cover & Profile Info */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        {/* Cover Photo */}
        <div 
          className={`h-48 w-full relative bg-brand-500 transition-all duration-300 group ${isAdjustingCover ? 'cursor-move' : ''}`}
          style={coverImage ? { backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: `center ${coverPositionY}%` } : {}}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {isAdjustingCover ? (
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4">
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsAdjustingCover(false)}
                  className="px-4 py-1.5 bg-black/50 hover:bg-black/70 text-white rounded-md text-sm font-medium backdrop-blur-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setIsAdjustingCover(false);
                    showToast("Cover photo updated successfully.");
                  }}
                  className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
              <div className="flex justify-center pb-8 pointer-events-none">
                <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2 shadow-sm">
                  <Move size={16} /> Drag to reposition
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <button 
                 onClick={() => coverInputRef.current?.click()}
                 className="flex items-center gap-2 bg-white/90 text-slate-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors shadow-sm"
               >
                 <Camera size={16} />
                 {coverImage ? "Change Cover" : "Add Cover"}
               </button>
               {coverImage && (
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     setCoverImage(null);
                     setCoverPositionY(50);
                   }}
                   className="flex items-center justify-center h-9 w-9 bg-white/90 text-rose-600 rounded-full hover:bg-white hover:text-rose-700 transition-colors shadow-sm"
                   title="Remove Cover Photo"
                 >
                   <Trash2 size={16} />
                 </button>
               )}
            </div>
          )}
          <input 
            type="file" 
            ref={coverInputRef} 
            onChange={handleCoverUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Profile Details Section */}
        <div className="px-8 pb-8 relative">
          {/* Avatar overhanging the cover photo */}
          <div className="absolute -top-12 left-8">
            <div className="relative group">
              <div 
                className="h-24 w-24 rounded-full border-4 border-white bg-brand-100 flex items-center justify-center shadow-sm overflow-hidden"
                style={profileImage ? { backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {!profileImage && <span className="text-3xl font-bold text-brand-800">JD</span>}
              </div>
              
              {isEditingProfilePhoto ? (
                <div className="absolute -right-12 top-2 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setIsEditingProfilePhoto(false);
                      showToast("Profile photo updated successfully.");
                    }}
                    className="h-8 w-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 transition-colors"
                    title="Save Profile Photo"
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => {
                      setProfileImage(null);
                      setIsEditingProfilePhoto(false);
                    }}
                    className="h-8 w-8 bg-slate-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-600 transition-colors"
                    title="Cancel"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <>
                  {/* Profile Photo Upload Button */}
                  <button 
                    onClick={() => profileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 h-8 w-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm hover:text-brand-600 transition-colors"
                    title="Update Profile Photo"
                  >
                    <Camera size={14} />
                  </button>
                  
                  {profileImage && (
                    <button 
                      onClick={() => setProfileImage(null)}
                      className="absolute top-0 right-0 h-7 w-7 bg-rose-500 text-white border-2 border-white rounded-full flex items-center justify-center shadow-sm hover:bg-rose-600 transition-colors"
                      title="Remove Profile Photo"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </>
              )}
              
              <input 
                type="file" 
                ref={profileInputRef} 
                onChange={handleProfileUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dr. John Doe</h2>
              <div className="flex items-center gap-2 text-slate-500 mt-1">
                <Mail size={14} />
                <span className="text-sm font-medium">john.doe@unisuite.edu</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100 self-start md:self-auto">
              <ShieldCheck size={16} />
              <span className="text-sm font-semibold">Faculty / Teacher</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Information */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-brand-800">
            <User size={20} className="stroke-[2.5]" />
            <h3 className="text-lg font-bold tracking-tight">Personal Information</h3>
          </div>
          
          <div className="space-y-5 flex-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={16} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue="+92 300 1234567"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Language Preference</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe size={16} className="text-slate-400" />
                </div>
                <select className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 appearance-none cursor-pointer transition-all">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-400" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Note: The teacher panel defaults to English. Changing this updates your global preference.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <button 
              onClick={() => showToast("Personal information saved successfully.")}
              className="w-full bg-brand-800 text-white font-semibold py-3 rounded-xl hover:bg-brand-900 transition-colors shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-brand-800">
            <Key size={20} className="stroke-[2.5]" />
            <h3 className="text-lg font-bold tracking-tight">Security Settings</h3>
          </div>
          
          <div className="space-y-5 flex-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Current Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">New Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-8 pt-4">
            <button 
              onClick={() => showToast("Security settings updated successfully.")}
              className="w-full bg-white text-slate-700 border border-slate-200 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
