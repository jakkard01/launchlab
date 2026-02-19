# SINGLE SOURCE OF TRUTH (ANTI-MULTIVERSO)

Ruta canonica (repo real):
- WSL: /home/hagga/work/launchlab__PROD
- Windows: C:\\Demonio_IA\\06_Web\\launchlab__PROD

Nota: en WSL, /home/hagga/work/launchlab__PROD es un symlink a /mnt/c/Demonio_IA/06_Web/launchlab__PROD.

Vercel:
- launchlabv1 (ver .vercel/project.json)

Drive (para Gemini):
- Debe apuntar o sincronizar **esta** carpeta: C:\\Demonio_IA\\06_Web\\launchlab__PROD
- Si usas un mirror/sync, que sea 1:1 y sin snapshots paralelos.

NO usar (archivado):
- C:\\Demonio_IA\\98_Archive\\QUARANTINE\\2026-02-19__1907\\__ARCHIVE__launchlab__CLEAN
- C:\\Demonio_IA\\98_Archive\\QUARANTINE\\2026-02-19__1907\\__ARCHIVE__launchlab__CANON
- C:\\Demonio_IA\\98_Archive\\QUARANTINE\\2026-02-19__1907\\__INCOMPLETE__launchlab__PROD_attempt1
- C:\\Demonio_IA\\98_Archive\\QUARANTINE\\2026-02-19__1907\\__INCOMPLETE__launchlab__PROD_attempt2

Checklist de verificacion antes de deploy:
- WSL: pwd -> /home/hagga/work/launchlab__PROD
- git rev-parse --show-toplevel -> /home/hagga/work/launchlab__PROD
- git rev-parse --abbrev-ref HEAD -> feat/pagina-hermana-live
- cat .vercel/project.json -> projectName launchlabv1
- sha256sum public/video/video.mp4 (WSL) = certificar con Windows (CertUtil)

