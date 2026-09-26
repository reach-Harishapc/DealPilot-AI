"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import PipelineMeetingsView from "./components/PipelineMeetingsView";
import MeetingFeed from "./components/MeetingFeed";
import BattlecardView from "./components/BattlecardView";
import AccountsView from "./components/AccountsView";
import ObjectionCoachView from "./components/ObjectionCoachView";
import CatalogView from "./components/CatalogView";
import IntegrationsView from "./components/IntegrationsView";
import CustomCompanyModal from "./components/CustomCompanyModal";
import ObjectionSimulatorModal from "./components/ObjectionSimulatorModal";
import LoginView from "./components/LoginView";
import UserProfileModal from "./components/UserProfileModal";
import LandingPageView from "./components/LandingPageView";
import BusinessPitchView from "./components/BusinessPitchView";
import DeveloperDocsView from "./components/DeveloperDocsView";

export default function Home() {
  const [pageMode, setPageMode] = useState("landing"); // "landing" | "login" | "app"
  const [currentView, setCurrentView] = useState("meetings");
  const [meetings, setMeetings] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState("meet-101");
  const [battlecard, setBattlecard] = useState(null);
  const [loading, setLoading] = useState(false);

  // User Profile & Authentication State
  const defaultUser = {
    name: "Harish Kumar",
    title: "Lead Enterprise AE • Strategic Accounts",
    email: "harish@rishailabs.com",
    company: "Rish AI Labs",
    quota: "$1,500,000 ARR",
    pipelineARR: "$1,150,000 ARR",
    avatar: "HK",
    role: "Strategic AE"
  };

  const [user, setUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Modals & Navigation
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load user session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dealpilot_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Set initial sidebar state based on device screen width
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  // Synchronize browser URL: clear stale hashes like #comparison and reflect active view
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pageMode === "app") {
        const viewQuery = currentView === "meetings" ? "" : `?view=${currentView}`;
        window.history.replaceState(null, "", window.location.pathname + viewQuery);
      } else if (pageMode === "login") {
        window.history.replaceState(null, "", window.location.pathname + "?page=login");
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [pageMode, currentView]);

  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      try {
        const [meetRes, accRes, catRes] = await Promise.all([
          apiFetch("/api/meetings"),
          apiFetch("/api/accounts"),
          apiFetch("/api/catalog")
        ]);

        if (meetRes.success && meetRes.data.length > 0) {
          setMeetings(meetRes.data);
          loadBattlecard(meetRes.data[0].id);
        }
        if (accRes.success) setAccounts(accRes.data);
        if (catRes.success) setCatalog(catRes.data);
      } catch (err) {
        console.error("Failed to load initial data:", err);
      }
    }
    loadData();
  }, []);

  const loadBattlecard = async (meetingId) => {
    setSelectedMeetingId(meetingId);
    setLoading(true);
    try {
      const data = await apiFetch("/api/battlecard", {
        method: "POST",
        body: JSON.stringify({ meetingId })
      });
      if (data.success) {
        setBattlecard(data.data);
      }
    } catch (err) {
      console.error("Failed to load battlecard:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "meetings":
        return "Pre-Meeting Intelligence";
      case "accounts":
        return "Account Intelligence";
      case "objections":
        return "Coach AI";
      case "catalog":
        return "Solution Catalog";
      case "integrations":
        return "CRM & Integrations";
      case "business":
        return "Business & Product Pitch";
      case "developer":
        return "Developer & API Documentation";
      default:
        return "Dashboard";
    }
  };

  if (pageMode === "landing") {
    return (
      <LandingPageView
        isLoggedIn={isLoggedIn}
        onGoToLogin={() => setPageMode("login")}
        onLaunchApp={() => setPageMode("app")}
      />
    );
  }

  if (pageMode === "login" || !isLoggedIn) {
    return (
      <LoginView
        onBackToHome={() => setPageMode("landing")}
        onLogin={(newUser) => {
          setUser(newUser);
          setIsLoggedIn(true);
          setPageMode("app");
          try {
            localStorage.setItem("dealpilot_user", JSON.stringify(newUser));
          } catch {}
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-[#faf8f5] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-amber-500/2 rounded-full blur-[160px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] bg-emerald-500/2 rounded-full blur-[120px]"></div>
      </div>

      {/* Global Sidebar (Left) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        meetingCount={meetings.length}
        accountCount={accounts.length}
        user={user}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onLogout={() => {
          setIsLoggedIn(false);
          setPageMode("landing");
        }}
        onViewLandingPage={() => setPageMode("landing")}
      />

      {/* Main Content Area (Right) */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top Header */}
        <TopHeader
          title={getPageTitle()}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          user={user}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onViewLandingPage={() => setPageMode("landing")}
        />

        {/* View Routing */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto overflow-y-auto">
          {currentView === "meetings" && (
            <PipelineMeetingsView
              meetings={meetings}
              selectedMeetingId={selectedMeetingId}
              onSelectMeeting={loadBattlecard}
              battlecard={battlecard}
              loading={loading}
              onMeetingsUpdated={(newMeetings) => {
                setMeetings((prev) => {
                  const merged = [...newMeetings];
                  prev.forEach((m) => {
                    if (!merged.some((nm) => nm.id === m.id)) {
                      merged.push(m);
                    }
                  });
                  return merged;
                });
                if (newMeetings.length > 0) {
                  loadBattlecard(newMeetings[0].id);
                }
              }}
            />
          )}

          {currentView === "accounts" && (
            <AccountsView
              accounts={accounts}
              onAccountsUpdated={(newAccounts) => {
                setAccounts(newAccounts);
              }}
              onOpenNewAccount={() => setIsCustomModalOpen(true)}
              onSelectAccountForMeeting={(accId) => {
                const meet = meetings.find((m) => m.accountId === accId);
                if (meet) {
                  loadBattlecard(meet.id);
                  setCurrentView("meetings");
                }
              }}
            />
          )}

          {currentView === "objections" && <ObjectionCoachView />}

          {currentView === "catalog" && (
            <CatalogView 
              catalog={catalog} 
              onSolutionAdded={(newSolution) => {
                setCatalog((prev) => [newSolution, ...prev]);
              }}
            />
          )}

          {currentView === "integrations" && (
            <IntegrationsView 
              onDealImported={(newMeeting) => {
                setMeetings((prev) => [newMeeting, ...prev.filter((m) => m.id !== newMeeting.id)]);
                loadBattlecard(newMeeting.id);
                setCurrentView("meetings");
              }}
              onMeetingsUpdated={(newMeetings) => {
                setMeetings((prev) => {
                  const merged = [...newMeetings];
                  prev.forEach((m) => {
                    if (!merged.some((nm) => nm.id === m.id)) {
                      merged.push(m);
                    }
                  });
                  return merged;
                });
                if (newMeetings.length > 0) {
                  loadBattlecard(newMeetings[0].id);
                  setCurrentView("meetings");
                }
              }}
            />
          )}

          {currentView === "business" && <BusinessPitchView />}

          {currentView === "developer" && <DeveloperDocsView />}
        </main>
      </div>

      {/* Global On-Demand Modals */}
      <CustomCompanyModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />
      <ObjectionSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          setUser(updated);
          try {
            localStorage.setItem("dealpilot_user", JSON.stringify(updated));
          } catch {}
        }}
        onLogout={() => {
          setIsProfileModalOpen(false);
          setIsLoggedIn(false);
          setPageMode("landing");
        }}
      />
    </div>
  );
}
