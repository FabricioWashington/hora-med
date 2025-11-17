self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'schedule-medication') {
    const { horarios, nome } = event.data;
    horarios.forEach(horario => {
      scheduleNotification(horario, nome);
    });
  }
});

function scheduleNotification(horario, nome) {
  const now = Date.now();
  const target = new Date(horario).getTime();
  const delay = target - now;
  if (delay > 0) {
    setTimeout(() => {
      self.registration.showNotification('HoraMed - Lembrete de Medicamento', {
        body: `Está na hora de tomar: ${nome}`,
        icon: '/icons/logo-transparent-192x192.png',
      });
    }, delay);
  }
}
