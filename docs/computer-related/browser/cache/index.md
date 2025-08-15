## **DNS**

全称 Domain Name System ,即域名系统。

万维网上 DNS 作为域名和 IP 地址相互映射的一个<span style="color: red;">分布式数据库</span>，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的 IP 数串。

DNS 协议运行在**UDP 协议之上，使用端口号 53**。

域名与 ip 的对应关系，被称为记录(record)，可分为各种类型

- A: Address，域名指向的 IP 地址，一个域名可以有多个 A 记录。

- NS：Name Server，保存**下一级域名信息的服务器地址**

- MX：Mail eXchange，接受电子邮件的服务器地址

- CNAME：Canonical Name，返回另一个域名，令当前查询域名挑去该域名，多个域名->服务器的映射。

- PTR： Pointer Record，只用于 ip 地址查询域名

DNS 由下面三个部分组成

- 名称解析器（resolver）

- 域名空间（domain name space）

- 名称服务器（name server）

DNS 查询过程：（如访问www.example.com）

- 检查浏览器缓存

- 检查操作系统缓存，常见的如 hosts 文件

- 检查路由器缓存

- 如果前几步都没没找到，会向 ISP(网络服务提供商)的 LDNS 服务器查询，本地 DNS 查询

- 如果 LDNS 服务器没找到，会向跟域名服务器(Root Server)请求解析，分为以下几步：

  - 跟服务器返回顶级域名(TLD)服务器如.com，.cn，.org 等的地址，全球只有 13 台,本例子返回.com

  - 接着向 TLD 发送请求，然后会返回次级域名(SLD)服务器的地址，本例子会返回.example 的地址

  - 接着向 SLD 域名服务器通过域名查询目标 IP，本例子会返回www.example.com的地址

- Local DNS Server 会缓存结果，并返回给用户，缓存在系统和浏览器中。

DNS 安全问题：

- DNS 反射/放大攻击

向大量开放 DNS 服务器发送大范围域名查询的 DNS 请求，并将该 DNS 请求的源 IP 地址伪造成想要攻击的目标 IP 地址。

由于请求数据比相应数据小得多，攻击者可以利用该技术放大掌握的带宽资源和攻击流量。

- DDOS 攻击可能造成域名解析瘫痪

- DNS/域名劫持

在劫持的网络范围内拦截域名解析的请求，分析请求的域名，返回假的 IP 地址或者使请求失去响应。

DNS 劫持通过篡改 DNS 服务器上的数据返回给用户一个错误的查询结果来实现的。

- DNS 污染

DNS 污染是一种让一般用户由于得到虚假目标主机 IP 而不能与其通信的方法，指的是用户访问一个地址，国内的服务器(非 DNS)监控到用户访问的已经被标记地址时，服务器伪装成 DNS 服务器向用户发回错误的地址的行为。

dns 污染与 dns 劫持的区别在于，dns 劫持修改了 dns 的解析结果，dns 污染是不经过 dns 服务器，返回错误信息

- DNS 信息黑客被修改

DNS 优化:

DNS Prefetching

用户在请求某个链接之前，浏览器先尝试解析该链接的域名再将其进行缓存。这样真正请求的时候就不需要进行 DNS 解析。

可以在服务器中响应设置 X-DNS-Prefetch-Control 的值为 on 启动预解析

HTML 中，<meta http-equiv="x-dns-prefetch-control" content="on">

对特定域名预解析<link rel=”dns-prefetch” href=”//fonts.googleapis.com”>

域名收敛

建议将静态资源只放在一个域名下面，可以有效减少 dns 的请求

httpdns

基于 Http 协议向 HTTPDNS 服务器发送域名解析请求，替代了基于 DNS 协议向运营商 Local DNS 发起解析请求的传统方式，可以避免运营商的域名劫持和进行精准调度。

这过程分为两步

客户端直接访问 HttpDNS 接口，获取业务在域名配置管理系统上配置的访问延迟最优的 IP。（基于容灾考虑，还是保留次选使用运营商 LocalDNS 解析域名的方式）

客户端向获取到的 IP 后就向直接往此 IP 发送业务协议请求。以 Http 请求为例，通过在 header 中指定 host 字段，向 HttpDNS 返回的 IP 发送标准的 Http 请求即可。

## **CDN**

CDN 的全称是 Content Delivery Network，即内容分发网络，它能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。

其目的是使用户可就近取得所需内容，**解决 Internet 网络拥挤的状况，提高用户访问网站的响应速度**。

CDN 系统由下面三个部分组成:

分发服务系统

最基本的工作单元就是**Cache 设备，**cache（边缘 cache）负责直接响应最终用户的访问请求，把缓存在本地的内容快速地提供给用 户。同时 cache 还负责与源站点进行内容同步，把更新的内容以及本地没有的内容从源站点获取并保存在本地。Cache 设备的数量、规模、总服务能力是衡 量一个 CDN 系统服务能力的最基本的指标

负载均衡系统

主要功能是负责对所有发起服务请求的用户进行访问调度，确定提供给用户的最终实际访问地址。两级调度体系分为全局负载均衡（GSLB）和本 地负载均衡（SLB）。GSLB 主要根据用户就近性原则，通过对每个服务节点进行“最优”判断，确定向用户提供服务的 cache 的物理位置。SLB 主要负 责节点内部的设备负载均衡

运营管理系统

分为运营管理和网络管理子系统，负责处理业务层面的与外界系统交互所必须的收集、整理、交付工作，包含客户管理、产品管理、计费管理、统计分析等功能

### **CDN 的过程**

使用 CDN 的方法很简单，只需要**修改自己的 DNS 解析，设置一个 CNAME 指向 CDN 服务商**即可

通俗点就是用户访问的资源原本是存放在你自己的服务器，通过**修改 DNS 让用户根据 IP 等情况来选择合适的 CDN 缓存服务器来获取资源**。

## **浏览器缓存**

![](https://secure2.wostatic.cn/static/iZFg9SCHBhpVt4vF4naGab/image.png?auth_key=1754796270-kr6x4mP9VD3X2uQX3xKgLb-0-909bc16e3c51f520da436e53efbcb35a)

浏览器缓存其实就是浏览器保存 通过 HTTP 获取的所有资源,是浏览器将网络资源存储在本地的一种行为。

## 缓存的资源去哪里了?

> memory cache

MemoryCache 顾名思义，就是将资源**缓存到内存中**，等待下次访问时不需要重新下载资源，而直接从内存中获取。

Webkit 早已支持 memoryCache。

目前 Webkit 资源分成两类，**一类是主资源**，比如 HTML 页面，或者下载项，**一类是派生资源**，比如 HTML 页面中内嵌的图片或者脚本链接，分别对应代码中两个类：MainResourceLoader 和 SubresourceLoader。

虽然 Webkit 支持 memoryCache，但是也只是针对派生资源，它对应的类为 CachedResource，用于保存原始数据（比如 CSS，JS 等），以及解码过的图片数据。

> disk cache

DiskCache 顾名思义，就是将**资源缓存到磁盘中**，等待下次访问时不需要重新下载资源，而直接从磁盘中获取，它的直接操作对象为 CurlCacheManager。

![](https://secure2.wostatic.cn/static/umGRuTMYkouhbXi2doeWtz/image_1.png?auth_key=1754796270-2e5kP9df7pq9VDkRA5wGgc-0-54bc5445e06847bec20daade911e1ba3)

因为 CSS 文件加载一次就可渲染出来,我们不会频繁读取它,所以它不适合缓存到内存中

但是 js 之类的脚本却**随时可能会执行**,如果脚本在磁盘当中,我们在执行脚本的时候需要从磁盘取到内存中来,这样 IO 开销就很大了,有可能导致浏览器失去响应。

> 三级缓存原理：

先在内存中查找,如果有,直接加载。

如果内存中不存在,则在硬盘中查找,如果有直接加载。

如果硬盘中也没有,那么就进行网络请求。

请求获取的资源缓存到硬盘和内存。

## 浏览器缓存分类

强缓存

协商缓存

浏览器再向服务器请求资源时,**首先判断是否命中强缓存,再判断是否命中协商缓存!**

> 强缓存

浏览器在加载资源时，会先根据本地缓存资源的 header 中的信息判断是否命中强缓存，**如果命中则直接使用缓存中的资源不会再向服务器发送请求**。

这里的 header 中的信息指的是 **expires 和 cahe-control.**

- Expires

  - 该字段是 **http1.0 **时的规范，它的值为一个**绝对时间的 GMT 格式的时间字符串**，
  - 比如 Expires:Mon,18 Oct 2066 23:59:59 GMT。这个时间代表着这个资源的失效时间，在此时间之前，即命中缓存。
  - 这种方式有一个明显的缺点，由于失效时间是一个绝对时间，所以**当服务器与客户端时间偏差较大时，就会导致缓存混乱。**

- Cache-Control

  - Cache-Control 是 **http1.1** 时出现的 header 信息，主要是利用该字段的 **max-age** 值来进行判断，它是一个**相对时间**

  - 例如 Cache-Control:max-age=3600，代表着资源的有效期是 3600 秒。cache-control 除了该字段外，还有下面几个比较常用的设置值：

  - **no-cache**：需要进行协商缓存，发送请求到服务器确认是否使用缓存。

  - **no-store**：禁止使用缓存，每一次都要重新请求数据。

  - **public**：可以被所有的用户缓存，包括终端用户和 CDN 等中间代理服务器。

  - **private**：只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存。

Cache-Control 与 Expires 可以在服务端配置同时启用，**同时启用的时候 Cache-Control 优先级高**

> 协商缓存

当强缓存没有命中的时候，浏览器会发送一个请求到服务器，服务器根据 header 中的部分信息来判断是否命中缓存。

如果命中，则返回 304 ，告诉浏览器资源未更新，可使用本地的缓存。没有命中会返回新的资源

这里的 header 中的信息指的是 **Last-Modify/If-Modify-Since 和 ETag/If-None-Match.**

#### **Last-Modify/If-Modify-Since：**

- 浏览器第一次请求一个资源的时候，服务器返回的 header 中会加上 Last-Modify，Last-modify 是**一个时间标识该资源的最后修改时间**。

  - 当浏览器再次请求该资源时，**request 的请求头中会包含 If-Modify-Since**，该值为缓存之前返回的 Last-Modify。服务器收到 If-Modify-Since 后，根据资源的最后修改时间判断是否命中缓存。

  - 如果命中缓存，则返回 304，并且不会返回资源内容，并且不会返回 Last-Modify。

  - 缺点:

    - 短时间内资源发生了改变，Last-Modified 并不会发生变化, Last-Modified 只能精确到秒。
    - 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了
    - 周期性变化。如果这个资源在一个周期内修改回原来的样子了，我们认为是可以使用缓存的，但是 Last-Modified 可不这样认为,因此便有了 ETag。

#### **ETag/If-None-Match：**

- 与 Last-Modify/If-Modify-Since 不同的是，**Etag/If-None-Match 返回的是一个校验码**。

  - ETag 是实体标签的缩写，根据实体内容生成的一段 hash 字符串,可以标识资源的状态。当资源发生改变时，ETag 也随之发生变化。 ETag 是 Web 服务端产生的，然后发给浏览器客户端。
  - ETag 可以保证每一个资源是唯一的，资源变化都会导致 ETag 变化。服务器根据浏览器上送的 If-None-Match 值来判断是否命中缓存。

  - 与 Last-Modified 不一样的是，当服务器返回 304 Not Modified 的响应时，由于 ETag 重新生成过，response header 中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。

Last-Modified 与 ETag 是可以一起使用的，**服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304**

## 启发式缓存

即使没有显式强缓存头（Cache-Control/Expires），浏览器也可能把资源写入磁盘缓存，并在短时间内“直接命中”disk cache。原因是浏览器会启用“启发式缓存（heuristic caching）”。

- 资源可缓存性：GET 200 的静态资源（如 image/png），且没有 no-store/私有敏感头，默认是“可缓存”的。

- 启发式新鲜期：当没有 Cache-Control/Expires，但有 Last-Modified（你有）时，浏览器会按规范允许的启发式规则估算一个新鲜期，常见实现是约等于当前时间与 Last-Modified 的时间差的 10%，且通常上限不超过 24 小时。

- 你的头里有 Last-Modified 和 Date，时间差约几十小时，那么启发式新鲜期大约是 4～5 小时。在这段时间内再次访问，同域同 URL 就可能直接 “from disk cache”。

- 有 ETag：即便过了启发式新鲜期，也会走协商缓存（304），但在新鲜期内无需发请求，直接命中本地缓存，所以你看到 disk cache

## 策略缓存