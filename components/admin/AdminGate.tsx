"use client";

import { useCallback, useEffect, useState } from "react";
import { useSecretShortcut } from "@/hooks/useSecretShortcut";
import AdminPanel from "./AdminPanel";
import AdminPasswordDialog from "./AdminPasswordDialog";

export default function AdminGate() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data: { authenticated?: boolean }) => {
        setAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setSessionChecked(true));
  }, []);

  const openAdminPanel = useCallback(() => {
    setPanelOpen(true);
  }, []);

  const handleUnlock = useCallback(() => {
    if (!sessionChecked) return;

    if (authenticated) {
      openAdminPanel();
    } else {
      setPasswordOpen(true);
    }
  }, [authenticated, sessionChecked, openAdminPanel]);

  const handlePasswordSuccess = useCallback(() => {
    setAuthenticated(true);
    openAdminPanel();
  }, [openAdminPanel]);

  useSecretShortcut(handleUnlock, {
    enabled: sessionChecked && !panelOpen && !passwordOpen,
  });

  useEffect(() => {
    const handleOpenEvent = () => handleUnlock();
    window.addEventListener("open-admin-gate", handleOpenEvent);
    return () => window.removeEventListener("open-admin-gate", handleOpenEvent);
  }, [handleUnlock]);

  return (
    <>
      <AdminPasswordDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
        onSuccess={handlePasswordSuccess}
      />
      <AdminPanel open={panelOpen} onOpenChange={setPanelOpen} />
    </>
  );
}
