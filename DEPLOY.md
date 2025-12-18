# Guia de Deploy - Cloudflare Pages

## Como publicar o site no Cloudflare Pages

### Passo 1: Preparar o Repositório

O código já está no GitHub. Certifique-se de que está tudo commitado:

```bash
git status
git log --oneline
```

### Passo 2: Acessar Cloudflare Pages

1. Acesse: https://dash.cloudflare.com/
2. Faça login na sua conta Cloudflare
3. No menu lateral, clique em **Pages**
4. Clique em **Create a project**

### Passo 3: Conectar ao GitHub

1. Clique em **Connect to Git**
2. Autorize o Cloudflare a acessar seu GitHub
3. Selecione o repositório: **JCDaher/DMprimeiravez**
4. Clique em **Begin setup**

### Passo 4: Configurar o Build

**Build settings:**
- **Project name:** dmprimeiravez (ou o nome que preferir)
- **Production branch:** claude/diabetes-consultation-system-qsGpF
- **Framework preset:** None
- **Build command:** (deixe vazio)
- **Build output directory:** src

**Environment variables:**
- Nenhuma necessária

### Passo 5: Deploy

1. Clique em **Save and Deploy**
2. Aguarde o deploy (geralmente 1-2 minutos)
3. Seu site estará disponível em: `https://dmprimeiravez.pages.dev`

### Passo 6: Domínio Personalizado (Opcional)

Se quiser usar um domínio próprio:
1. Vá em **Custom domains**
2. Clique em **Set up a custom domain**
3. Digite seu domínio
4. Siga as instruções para configurar DNS

## Alternativa: Deploy Manual

Se preferir não conectar ao GitHub:

1. No Cloudflare Pages, clique em **Upload assets**
2. Arraste a pasta `src/` para a área de upload
3. Clique em **Deploy site**

## Após o Deploy

### Verificar

- Acesse: https://dmprimeiravez.pages.dev
- Teste todas as funcionalidades
- Verifique exportação de PDF, TXT e MD

### Atualizações Futuras

Sempre que fizer mudanças no código:
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O Cloudflare Pages fará deploy automático!

## Problemas Comuns

### Erro 404
- Verifique se a pasta `src/` está configurada como build output directory
- Certifique-se de que o branch correto está selecionado

### Arquivos não carregam
- Verifique se todos os arquivos (HTML, CSS, JS) estão na pasta src/
- Confira os caminhos nos imports do HTML

### PDF não exporta
- Verifique se a CDN do jsPDF está acessível
- Teste a conexão com internet

## Suporte

- Documentação Cloudflare: https://developers.cloudflare.com/pages/
- Status: https://www.cloudflarestatus.com/
