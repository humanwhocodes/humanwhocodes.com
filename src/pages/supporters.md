---
title: Supporters
author: Nicholas C. Zakas
layout: page
---

## Supporters ({{ site.data.sponsors.size }})

Thanks to the following companies and individuals who are supporting my work with donations. ([Donate now](/donate))

<style>
.size7 {
    width: 16px;
    height: 16px;
}
.size15 {
    width: 24px;
    height: 24px;
}
.size27 {
    width: 32px;
    height: 32px;
}
.size50 {
    width: 40px;
    height: 40px;
}
.size100 {
    width: 48px;
    height: 48px;
}
.size200 {
    width: 64px;
    height: 64px;
}
.size500 {
    width: 64px;
    height: 64px;
}
.size1000 {
    width: 64px;
    height: 64px;
}
</style>

{% assign sponsors = site.data.sponsors | sort: 'amount' | reverse %}

<ul class="inline-list inline-image-list">
{% for sponsor in sponsors %}
<li>{% if sponsor.url != '' %}<a href="{{ sponsor.url }}">{% endif %}<img src="{{ sponsor.avatarUrl }}" alt="{{ sponsor.name }}" title="{{ sponsor.name }}" loading="lazy" class="size{{ sponsor.amount }}">{% if sponsor.url != '' %}</a>{% endif %}</li>
{% endfor %}
</ul>
