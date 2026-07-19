import { Component } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 错误边界 - 防止白屏
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: '#f4e4c1', background: '#1a120b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'serif' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧪</div>
          <h1 style={{ color: '#c9a84c', marginBottom: 8 }}>出错了...</h1>
          <p style={{ color: '#8b7355', fontSize: 14, textAlign: 'center' }}>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '8px 24px', background: '#3d2b1f', border: '2px solid #c9a84c', color: '#f4e4c1', fontFamily: 'serif', cursor: 'pointer' }}>刷新页面</button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
