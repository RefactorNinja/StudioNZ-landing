# DEPLOY — НЕ СТУДИЯ ЗВУКОЗАПИСИ

## Сервер

| Параметр | Значение |
|----------|----------|
| IP | 77.110.120.180 |
| ОС | Ubuntu 24.04 LTS |
| Веб-сервер | Nginx 1.24 |
| Путь сайта | `/var/www/nestudiya` |
| Домен | nestudiya.ru (Cloudflare) |

## Как задеплоено

1. `apt-get update && upgrade` — система обновлена.
2. Установлены: **nginx**, **git**, **curl**.
3. Репозиторий склонирован: `git clone https://github.com/RefactorNinja/StudioNZ-landing.git /var/www/nestudiya`
4. Настроен Nginx (`/etc/nginx/sites-available/nestudiya`):
   - `server_name nestudiya.ru www.nestudiya.ru;`
   - `root /var/www/nestudiya;`
   - кэш статики 30 дней, gzip включён.
5. Nginx включён в автозапуск: `systemctl enable nginx`.

## Обновление сайта на сервере

```bash
ssh root@77.110.120.180
git -C /var/www/nestudiya pull
```

## Nginx-конфиг

```nginx
server {
    listen 80;
    server_name nestudiya.ru www.nestudiya.ru;
    root /var/www/nestudiya;
    index index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js|png|jpg|jpeg|svg|gif|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
```

## SSL (следующий шаг)

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d nestudiya.ru -d www.nestudiya.ru
```

---
*Задеплоено: апрель 2026*
