import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppInput, SocialButtons, ShimmerButton, AuthCard, ShootingStars } from '@/components/ui/login-1'
import fullChar from '@/assets/images/full_resister_pg1.png'

const LOGIN_RIGHT_PANEL = (
    <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }}>
        <img
            src={fullChar}
            alt="Character"
            style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '95%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.55))',
                zIndex: 2,
            }}
        />
    </div>
)

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.email || !form.password) {
            setError('Please fill in all fields.')
            return
        }
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1200))
        setLoading(false)
        navigate('/')
    }

    const EyeIcon = () => (
        <button type="button" onClick={() => setShowPass(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            )}
        </button>
    )

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 relative"
            style={{
                background: 'radial-gradient(ellipse at 60% 40%, #e8eaed 0%, #d8dce3 40%, #cdd2da 100%)',
            }}
        >
            <ShootingStars />
            <AuthCard rightPanel={LOGIN_RIGHT_PANEL}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    {/* Header */}
                    <div className="text-center mb-2">
                        <h1 className="text-3xl font-extrabold mb-1" style={{ color: 'var(--color-heading)' }}>
                            Hi, Welcome Back! 👋
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Sign in to continue to Link Up
                        </p>
                    </div>

                    {/* Social */}
                    <SocialButtons label="or sign in with email" />

                    {/* Error */}
                    {error && (
                        <div className="text-sm px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                            {error}
                        </div>
                    )}

                    {/* Fields */}
                    <AppInput
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    <AppInput
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        label="Password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        icon={<EyeIcon />}
                    />

                    {/* Forgot */}
                    <div className="text-right -mt-2">
                        <a href="#" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}
                            onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit */}
                    <ShimmerButton type="submit" disabled={loading}>
                        {loading ? (
                            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : 'Sign In'}
                    </ShimmerButton>

                    {/* Switch */}
                    <p className="text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--color-text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </AuthCard>
        </div>
    )
}
