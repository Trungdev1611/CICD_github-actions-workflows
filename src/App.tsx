import './App.css'
import Counter from "./components/Counter.tsx"
import UsersList from "./components/UsersList.tsx"

function App() {

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '100%'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        paddingBottom: '2rem',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <h1 style={{ 
          margin: '0 0 1rem 0',
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Learn React - CI/CD Demo
        </h1>
        <p style={{ color: '#666', margin: 0 }}>
          React + TypeScript + Vite + GitHub Actions
        </p>
      </header>
      
      <section style={{ marginBottom: '3rem' }}>
        <Counter />
      </section>
      
      <section>
        <UsersList />
      </section>
    </div>
  )
}

export default App
