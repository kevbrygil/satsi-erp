import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import TextInput from '@components/Inputs/TextInput';
import ButtonPrimary from '@components/Buttons/ButtonPrimary';
import { useRouter } from '@hooks/useRouter';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace('/dashboard/ventas');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E1EDF2] font-inter p-6">
      <div className="w-full max-w-[360px] flex flex-col items-center">
        <h1 className="text-[32px] font-bold text-[#003262] mb-10 tracking-tight">Satsi ERP</h1>
        
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <TextInput
            label="Email"
            type="email"
            placeholder="Email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <TextInput
            label="Contraseña"
            isPassword
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="mt-2">
            <ButtonPrimary type="submit" title="Iniciar Sesión" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
