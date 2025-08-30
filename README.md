# IoT Event Handler Frontend

Uma aplicação frontend React para gerenciamento de dispositivos IoT e monitoramento de eventos em tempo real.

## 🚀 Funcionalidades

### 📱 Página de Gerenciamento de Dispositivos
- **CRUD completo de dispositivos**: Criar, listar, editar e deletar dispositivos
- **Campos obrigatórios**: Nome e localização do dispositivo
- **Identificação única**: Cada dispositivo possui UUID e integrationId
- **Interface intuitiva**: Design moderno com Tailwind CSS
- **Confirmação de exclusão**: Dialog customizado para confirmar deleção de dispositivos
- **Validação de formulários**: Campos obrigatórios com feedback visual

### 📊 Dashboard de Eventos
- **Visualização em tempo real**: Eventos dos dispositivos IoT com atualização automática (30s)
- **Destaque visual de alarmes**: Eventos críticos destacados em vermelho
- **Filtros inteligentes**: 
  - Todos os eventos
  - Apenas alarmes ativos
- **Dados detalhados**: Temperatura, umidade, timestamp e dispositivo associado
- **Notificações de alarmes**: Banner de alerta quando há alarmes ativos

### 🎨 Componentes Personalizados
- **ConfirmationDialog**: Modal customizado para confirmações
- **DeviceForm**: Formulário reutilizável para criar/editar dispositivos
- **DeviceList**: Lista responsiva de dispositivos com ações inline
- **EventDashboard**: Dashboard completo de eventos

## 🛠 Tecnologias Utilizadas

- **React 19** com TypeScript para tipagem estática
- **Vite** como bundler e dev server
- **Tailwind CSS** para estilização moderna
- **Axios** para requisições HTTP
- **React Hooks** para gerenciamento de estado

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── DeviceManagement.tsx    # Página principal de gerenciamento
│   ├── DeviceList.tsx           # Lista de dispositivos
│   ├── DeviceForm.tsx           # Formulário de dispositivo
│   ├── EventDashboard.tsx       # Dashboard de eventos
│   └── ConfirmationDialog.tsx   # Modal de confirmação
├── services/               # Serviços para API
│   ├── deviceService.ts        # CRUD de dispositivos
│   └── eventService.ts         # Serviços de eventos
├── types/                  # Definições TypeScript
│   ├── Device.ts              # Tipos de dispositivo
│   └── Event.ts               # Tipos de evento
├── api/                    # Configuração da API
│   └── index.ts               # Cliente Axios configurado
└── App.tsx                 # Componente raiz
```

## 📋 Tipos de Dados

### Device
```typescript
interface Device {
  uuid: string;           // UUID único
  name: string;           // Nome do dispositivo
  location: string;       // Localização física
  integrationId?: string; // ID de integração
}
```

### Event
```typescript
interface Event {
  uuid: string;         // UUID único do evento
  deviceUuid: string;   // UUID do dispositivo associado
  temperature?: number; // Temperatura registrada
  humidity?: number;    // Umidade registrada
  timestamp: string;    // Timestamp ISO do evento
  isAlarm: boolean;     // Indica se é um alarme crítico
}
```

## 🔧 Configuração e Execução

### Pré-requisitos
- Node.js 18+ 
- Yarn
- API Backend rodando em `localhost:5038`

### Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/danielreboucas/iot-event-handler-frontend.git
   cd iot-event-handler-frontend
   ```

2. **Instale as dependências**:
   ```bash
   yarn
   ```

3. **Execute em desenvolvimento**:
   ```bash
   yarn dev
   ```

4. **Acesse a aplicação**:
   - Abra [http://localhost:5173](http://localhost:5173) no navegador

## 🌐 Integração com API

### Endpoints Utilizados

**Dispositivos:**
- `GET /api/devices` - Lista todos os dispositivos
- `GET /api/devices/{uuid}` - Busca dispositivo por UUID
- `POST /api/devices` - Cria novo dispositivo
- `PUT /api/devices/{uuid}` - Atualiza dispositivo
- `DELETE /api/devices/{integrationId}` - Remove dispositivo

**Eventos:**
- `GET /api/events` - Lista todos os eventos

## ✨ Funcionalidades Especiais

### 🚨 Sistema de Alarmes
- **Identificação visual**: Eventos com `isAlarm: true` destacados em vermelho
- **Contador de alarmes**: Badge com número de alarmes ativos
- **Filtro dedicado**: Visualização exclusiva de alarmes
- **Notificação banner**: Alerta persistente quando há alarmes

### 🎯 Experiência do Usuário
- **Loading states**: Indicadores visuais durante carregamento
- **Feedback visual**: Estados hover e focus bem definidos
- **Confirmações**: Diálogos customizados em português
- **Responsividade**: Layout adaptável para diferentes telas

### 🔄 Atualizações em Tempo Real
- **Polling automático**: Eventos atualizados a cada 30 segundos
- **Estado sincronizado**: Interface sempre atualizada com backend
- **Performance otimizada**: Requests eficientes sem redundâncias

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview

# Linting
yarn lint
```

## 🚀 Deploy

1. **Build de produção**:
   ```bash
   yarn build
   ```

2. **Arquivos gerados**: `dist/`

3. **Servir estáticos**: Qualquer servidor web pode hospedar os arquivos da pasta `dist/`
