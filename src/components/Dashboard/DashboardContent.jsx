import React from 'react';
import { 
  FiBriefcase, FiDollarSign, FiCheckSquare, FiAlertTriangle, 
  FiPlusCircle, FiUserPlus, FiCpu, FiEye 
} from 'react-icons/fi';

export default function DashboardContent() {
  const summaryCards = [
    { 
      id: 1, 
      title: 'Proyectos Activos', 
      value: '15', 
      icon: <FiBriefcase className="text-blue-400 text-3xl" />, 
      iconName: 'briefcase',
      bgColor: 'bg-blue-900 bg-opacity-40' 
    },
    { 
      id: 2, 
      title: 'Presupuesto Total (Mes)', 
      value: '$125,800', 
      icon: <FiDollarSign className="text-green-400 text-3xl" />, 
      iconName: 'dollar-sign',
      bgColor: 'bg-green-900 bg-opacity-40' 
    },
    { 
      id: 3, 
      title: 'Tareas Pendientes', 
      value: '42', 
      icon: <FiCheckSquare className="text-yellow-400 text-3xl" />, 
      iconName: 'list-checks',
      bgColor: 'bg-yellow-900 bg-opacity-40' 
    },
    { 
      id: 4, 
      title: 'Alertas Críticas', 
      value: '2', 
      icon: <FiAlertTriangle className="text-red-400 text-3xl" />, 
      iconName: 'alert-triangle',
      bgColor: 'bg-red-900 bg-opacity-40' 
    },
  ];
  const projectsData = [
    { 
      id: 1, 
      name: 'Edificio Corporativo XYZ', 
      status: 'En Progreso', 
      progress: 65, 
      deadline: '2025-08-15', 
      responsible: 'Juan Pérez' 
    },
    { 
      id: 2, 
      name: 'Centro Comercial Riverside', 
      status: 'Planificación', 
      progress: 30, 
      deadline: '2025-10-22', 
      responsible: 'María López' 
    },
    { 
      id: 3, 
      name: 'Torre Residencial Vista Hermosa', 
      status: 'Finalizado', 
      progress: 100, 
      deadline: '2025-04-10', 
      responsible: 'Carlos Gómez' 
    },
    { 
      id: 4, 
      name: 'Remodelación Oficinas TechHub', 
      status: 'Retrasado', 
      progress: 45, 
      deadline: '2025-05-01', 
      responsible: 'Ana Martínez' 
    },
  ];
  const getStatusStyle = (status) => {
    switch(status) {
      case 'En Progreso': return 'bg-blue-500 text-white';
      case 'Planificación': return 'bg-purple-500 text-white';
      case 'Finalizado': return 'bg-green-500 text-white';
      case 'Retrasado': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map(card => (
          <div key={card.id} className={`${card.bgColor} p-6 rounded-lg border border-opacity-20 border-gray-600 shadow-lg`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-300 mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
              <div className="p-2 rounded-lg bg-gray-800 bg-opacity-50">
                {card.icon}
                <span className="sr-only">{card.iconName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
          <FiPlusCircle className="mr-2" />
          <span>Nuevo Proyecto</span>
        </button>
        <button className="flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
          <FiUserPlus className="mr-2" />
          <span>Añadir Trabajador</span>
        </button>
        <button className="flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
          <FiCpu className="mr-2" />
          <span>Generar Cotización AI</span>
        </button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Resumen de Proyectos Activos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4">NOMBRE PROYECTO</th>
                <th className="px-6 py-4">ESTADO</th>
                <th className="px-6 py-4">PROGRESO</th>
                <th className="px-6 py-4">FECHA LÍMITE</th>
                <th className="px-6 py-4">RESPONSABLE</th>
                <th className="px-6 py-4">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projectsData.map(project => (
                <tr key={project.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium">{project.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`${getProgressColor(project.progress)} h-2 rounded-full`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.deadline}</td>
                  <td className="px-6 py-4">{project.responsible}</td>
                  <td className="px-6 py-4">
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center">
                      <FiEye className="mr-1" />
                      <span>Ver Detalles</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-0 py-3">Rendimiento General (Últimos 6 Meses)</h3>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded-md"></div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-0 py-3">Uso del Presupuesto por Proyecto</h3>
          <div className="bg-gray-700 h-64 flex items-center justify-center rounded-md"></div>
        </div>
      </section>
    </div>
  );
}