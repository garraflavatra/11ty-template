---
layout: base.njk
title: Demo
---

## Image

```njk
{% raw %}{% image 'https://images.unsplash.com/photo-1514722576538-e8501559835e', 'Chameleon' %}{% endraw %}
```

{% image 'https://images.unsplash.com/photo-1514722576538-e8501559835e', 'Chameleon' %}

## CSS background image

```html
<p class="bg"></p>
```

<p class="bg"></p>

## Styles

```html
<p class="style">These are some demo styles written in SCSS.</p>
```

<p class="style">These are some demo styles written in SCSS.</p>

## Hashed asset paths

Get an asset path:

```njk
{% raw %}{% asset 'demo.js' %}{% endraw %}
```

```
{% asset 'demo.js' %}
```

## Inline assets

Asset contents can be inlined for better performance:

```njk
{% raw %}{% inlineasset 'test.js' %}{% endraw %}
```

```
{% inlineasset 'test.js' %}
```
