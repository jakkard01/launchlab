# NAV_MAP

```mermaid
graph TD
  Home[/] --> Web[/web]
  Home --> Pricing[/pricing]
  Home --> Services[/services]
  Home --> Demos[/demos]
  Home --> Video[/video]
  Home --> Ops[/ops]
  Home --> Bots[/bots]
  Home --> Contact[/contact]
  Home --> Alcance[/alcance]
  Demos --> BotDemo[/demos/bot]
  Services --> ServiceDetail[/services/:slug]
  Portfolio[/portfolio] --> PortfolioDetail[/portfolio/:slug]
```
