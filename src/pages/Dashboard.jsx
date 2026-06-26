import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiClock, FiStar, FiAward, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-10px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="glass-panel p-6 rounded-3xl flex items-center justify-between hover:-translate-y-1 transition-transform"
  >
    <div>
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-800 dark:text-white">{value}</p>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-slate-400 animate-pulse text-center mt-20">Loading Dashboard...</div>;
  if (!data) return <div className="text-slate-400">Failed to load data.</div>;

  const { stats, charts } = data;

  const lineChartData = {
    labels: charts.weekly_progress.labels,
    datasets: [
      {
        label: 'Learning Hours',
        data: charts.weekly_progress.data,
        borderColor: '#38bdf8', // cyan-400
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: charts.skill_completion.labels,
    datasets: [
      {
        data: charts.skill_completion.data,
        backgroundColor: ['#3b82f6', '#06b6d4', '#8b5cf6'], // blue, cyan, purple
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8' } },
    },
    scales: {
      x: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#94a3b8' } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back! 👋</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's an overview of your learning progress today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Skills Started" value={stats.skills_started} delay={0.1} icon={<FiPlayCircle />} color="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20" />
        <StatCard title="Skills Completed" value={stats.skills_completed} delay={0.2} icon={<FiCheckCircle />} color="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" />
        <StatCard title="Current Streak (Days)" value={stats.current_streak} delay={0.3} icon={<FiTrendingUp />} color="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20" />
        <StatCard title="Total Hours" value={stats.learning_hours} delay={0.4} icon={<FiClock />} color="bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20" />
        <StatCard title="XP Points" value={stats.xp_points} delay={0.5} icon={<FiStar />} color="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20" />
        <StatCard title="Badges Earned" value={stats.badges_earned} delay={0.6} icon={<FiAward />} color="bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-2 glass-panel bg-white/50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50"
        >
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Weekly Progress</h2>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="glass-panel bg-white/50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50"
        >
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Skill Completion</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={doughnutData} options={{...chartOptions, scales: {}}} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
