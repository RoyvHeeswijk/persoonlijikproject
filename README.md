# Charla

Dit project is een webapplicatie gebouwd met Next.js en Tailwind CSS die verbinding maakt met de OpenAI API om gesproken woorden naar tekst te vertalen.
Het staat ook online op https://www.persoonlijkproject-saj9.vercel.app

## Functies

- Audio opnemen via de browser
- Spraak naar tekst vertalen met behulp van OpenAI's API
- Moderne en responsieve UI met Tailwind CSS
- Server-side rendering met Next.js

## Gebruikte Technologieën

- [Next.js](https://nextjs.org/) - React framework voor server-side rendering en statische site generatie
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenAI API](https://openai.com/api/) - Voor spraakherkenning en vertaling

## Installatie

1. Kloon de repository
2. Installeer de benodigde packages:
   ```
   npm install
   ```
3. Maak een `.env.local` bestand aan in de hoofdmap en voeg je OpenAI API-sleutel toe:
   ```
   OPENAI_API_KEY=jouw_api_sleutel_hier
   ```
4. Start de ontwikkelingsserver:
   ```
   npm run dev
   ```

## Gebruik

1. Open de applicatie in je webbrowser
2. Klik op de "Microfoon" knop en spreek in je microfoon
3. Klik nogmaals op de "Microfoon" wanneer je klaar bent met spreken
4. De applicatie zal je spraak verwerken en de tekstvertaling weergeven


