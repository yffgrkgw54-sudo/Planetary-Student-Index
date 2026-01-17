// ========================================
// PLANETARY STUDENT NETWORK
// D3.js Force-Directed Graph Visualization
// ========================================

class PlanetaryStudentNetwork {
    constructor() {
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
        this.filteredNodes = [];
        this.filteredLinks = [];
        this.selectedNode = null;
        this.centeredNode = null;
        this.colorMode = 'type';
        this.tooltip = null;
        
        // Color mappings
        this.colors = {
            type: {
                'PD': '#a87d42',  // Munsell 10YR 6/6
                'ID': '#9a6640',  // Munsell 7.5YR 5/6
                'BIB': '#c4b078'  // Munsell 2.5Y 7/4
            },
            priority: {
                'PP01': '#9a5b3c',  // Munsell 5YR 5/6
                'PP02': '#8b6914',  // Munsell 10YR 5/4
                'PP03': '#82784c'   // Munsell 5Y 5/3
            },
            focus: {
                'FA01': '#d4a574',  // Munsell 10YR 8/6
                'FA02': '#b5784d',  // Munsell 7.5YR 6/6
                'FA03': '#bc6b4a',  // Munsell 5YR 6/6
                'FA04': '#8a9a9c',  // Munsell Gley
                'FA05': '#8a7c4c',  // Munsell 2.5Y 5/4
                'FA06': '#9e9460'   // Munsell 5Y 6/3
            },
            era: {
                'foundational': '#4a3d30',
                'formal-curriculum': '#7a5235',
                'consolidation': '#8b6914',
                'philosophy-revolution': '#9a5b3c',
                'environmental-social': '#9a6640',
                'digital-revolution': '#a87d42',
                'contemporary': '#c49358',
                'emerging': '#c4b078'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupSVG();
        this.setupTooltip();
        this.loadData();
        this.setupFilters();
        this.setupEventListeners();
        this.setupSearch();
        this.render();
    }
    
    setupSVG() {
        const container = document.querySelector('.visualization-area');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.svg = d3.select('#network-svg')
            .attr('width', width)
            .attr('height', height);
        
        // Create groups for links and nodes
        this.svg.append('g').attr('class', 'links-group');
        this.svg.append('g').attr('class', 'nodes-group');
        this.svg.append('g').attr('class', 'labels-group');
        
        // Setup zoom
        const zoom = d3.zoom()
            .scaleExtent([0.2, 4])
            .on('zoom', (event) => {
                this.svg.selectAll('g').attr('transform', event.transform);
            });
        
        this.svg.call(zoom);
        
        this.width = width;
        this.height = height;
    }
    
    setupTooltip() {
        this.tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none');
    }
    
    loadData() {
        // Deep clone nodes to avoid mutation
        this.nodes = networkData.nodes.map(n => ({...n}));
        this.links = networkData.links.map(l => ({
            ...l,
            source: l.source,
            target: l.target
        }));
        
        this.filteredNodes = [...this.nodes];
        this.filteredLinks = [...this.links];
    }
    
    setupFilters() {
        // Entry type filters
        document.querySelectorAll('.filter-group input[value^="PD"], .filter-group input[value^="ID"], .filter-group input[value^="BIB"]').forEach(input => {
            if (['PD', 'ID', 'BIB'].includes(input.value)) {
                input.addEventListener('change', () => this.applyFilters());
            }
        });
        
        // Priority filters
        document.querySelectorAll('.filter-group input[value^="PP"]').forEach(input => {
            input.addEventListener('change', () => this.applyFilters());
        });
        
        // Focus area filters
        document.querySelectorAll('.filter-group input[value^="FA"]').forEach(input => {
            input.addEventListener('change', () => this.applyFilters());
        });
        
        // Node display options
        document.querySelectorAll('input[name="node-display"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.colorMode = e.target.value;
                this.updateNodeColors();
            });
        });
        
        // Time range
        document.getElementById('time-range-start').addEventListener('input', (e) => {
            document.getElementById('time-start').textContent = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('time-range-end').addEventListener('input', (e) => {
            document.getElementById('time-end').textContent = e.target.value;
            this.applyFilters();
        });
        
        // Reset filters
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });
    }
    
    applyFilters() {
        // Get active type filters
        const activeTypes = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
            .filter(input => ['PD', 'ID', 'BIB'].includes(input.value))
            .map(input => input.value);
        
        // Get active priority filters
        const activePriorities = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
            .filter(input => input.value.startsWith('PP'))
            .map(input => input.value);
        
        // Get active focus area filters
        const activeFocusAreas = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
            .filter(input => input.value.startsWith('FA'))
            .map(input => input.value);
        
        // Get time range
        const timeStart = parseInt(document.getElementById('time-range-start').value);
        const timeEnd = parseInt(document.getElementById('time-range-end').value);
        
        // Filter nodes
        this.filteredNodes = this.nodes.filter(node => {
            // Type filter
            const hasType = node.types.some(t => activeTypes.includes(t));
            
            // Priority filter
            const hasPriority = node.priorities.some(p => activePriorities.includes(p));
            
            // Focus area filter
            const hasFocusArea = node.focusAreas.some(f => activeFocusAreas.includes(f));
            
            // Time filter
            const inTimeRange = node.year >= timeStart && node.year <= timeEnd;
            
            return hasType && hasPriority && hasFocusArea && inTimeRange;
        });
        
        // Filter links to only include those between visible nodes
        const visibleNodeIds = new Set(this.filteredNodes.map(n => n.id));
        this.filteredLinks = this.links.filter(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
        });
        
        this.render();
    }
    
    resetFilters() {
        // Reset all checkboxes
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(input => {
            input.checked = true;
        });
        
        // Reset time range
        document.getElementById('time-range-start').value = 1857;
        document.getElementById('time-range-end').value = 2025;
        document.getElementById('time-start').textContent = '1857';
        document.getElementById('time-end').textContent = '2025';
        
        // Reset color mode
        document.querySelector('input[name="node-display"][value="type"]').checked = true;
        this.colorMode = 'type';
        
        this.applyFilters();
    }
    
    setupEventListeners() {
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const view = e.target.dataset.view;
                document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
                document.getElementById(`${view}-view`).classList.add('active');
                
                if (view === 'timeline') {
                    this.renderTimeline();
                } else if (view === 'radial') {
                    this.renderRadialView();
                }
            });
        });
        
        // Close detail panel
        document.getElementById('close-detail').addEventListener('click', () => {
            this.closeDetailPanel();
        });
        
        // Add entry modal
        document.getElementById('add-entry-btn').addEventListener('click', () => {
            document.getElementById('add-entry-modal').classList.add('open');
        });
        
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('add-entry-modal').classList.remove('open');
        });
        
        document.getElementById('cancel-entry').addEventListener('click', () => {
            document.getElementById('add-entry-modal').classList.remove('open');
        });
        
        // Form submission
        document.getElementById('entry-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewEntry();
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            const matches = this.nodes.filter(node => 
                node.title.toLowerCase().includes(query) ||
                node.description.toLowerCase().includes(query) ||
                node.location.toLowerCase().includes(query)
            ).slice(0, 8);
            
            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(node => `
                    <div class="search-result-item" data-id="${node.id}">
                        <div class="search-result-year">${node.year}</div>
                        <div class="search-result-title">${node.title}</div>
                    </div>
                `).join('');
                
                searchResults.classList.add('active');
                
                // Add click handlers
                searchResults.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const nodeId = parseInt(item.dataset.id);
                        this.focusOnNode(nodeId);
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    });
                });
            } else {
                searchResults.classList.remove('active');
            }
        });
        
        // Close search results on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.classList.remove('active');
            }
        });
    }
    
    getNodeColor(node) {
        switch (this.colorMode) {
            case 'type':
                return this.colors.type[node.types[0]] || '#666';
            case 'priority':
                return this.colors.priority[node.priorities[0]] || '#666';
            case 'focus':
                return this.colors.focus[node.focusAreas[0]] || '#666';
            case 'era':
                const era = this.getEra(node.year);
                return this.colors.era[era] || '#666';
            default:
                return '#666';
        }
    }
    
    getEra(year) {
        for (const [key, era] of Object.entries(networkData.eras)) {
            if (year >= era.start && year <= era.end) {
                return key;
            }
        }
        return 'contemporary';
    }
    
    getNodeRadius(node) {
        // BIB nodes (theoretical foundations) are larger
        const baseRadius = node.types.includes('BIB') ? 12 : 8;
        
        // Nodes with more connections are larger
        const connectionCount = this.filteredLinks.filter(l => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === node.id || targetId === node.id;
        }).length;
        
        return baseRadius + Math.min(connectionCount * 0.5, 6);
    }
    
    render() {
        // Stop existing simulation
        if (this.simulation) {
            this.simulation.stop();
        }
        
        // Prepare data
        const nodes = this.filteredNodes.map(n => ({...n}));
        const links = this.filteredLinks.map(l => ({
            ...l,
            source: typeof l.source === 'object' ? l.source.id : l.source,
            target: typeof l.target === 'object' ? l.target.id : l.target
        }));
        
        // Create simulation
        this.simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links)
                .id(d => d.id)
                .distance(d => d.type === 'lineage' ? 80 : 120)
                .strength(d => d.type === 'explicit' ? 0.5 : 0.2))
            .force('charge', d3.forceManyBody()
                .strength(-200)
                .distanceMax(400))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => this.getNodeRadius(d) + 5));
        
        // Render links
        const linkGroup = this.svg.select('.links-group');
        linkGroup.selectAll('.link').remove();
        
        const link = linkGroup.selectAll('.link')
            .data(links)
            .join('line')
            .attr('class', d => `link ${d.type || ''}`)
            .attr('stroke-width', d => d.type === 'lineage' ? 2 : 1);
        
        // Render nodes
        const nodeGroup = this.svg.select('.nodes-group');
        nodeGroup.selectAll('.node').remove();
        
        const node = nodeGroup.selectAll('.node')
            .data(nodes)
            .join('circle')
            .attr('class', d => `node ${d.types.includes('BIB') ? 'bib-node' : ''}`)
            .attr('r', d => this.getNodeRadius(d))
            .attr('fill', d => this.getNodeColor(d))
            .call(this.drag(this.simulation))
            .on('click', (event, d) => {
                event.stopPropagation();
                this.selectNode(d);
            })
            .on('dblclick', (event, d) => {
                event.stopPropagation();
                this.centerOnNode(d);
            })
            .on('mouseover', (event, d) => {
                this.showTooltip(event, d);
                this.highlightConnections(d);
            })
            .on('mouseout', () => {
                this.hideTooltip();
                this.clearHighlights();
            });
        
        // Render labels
        const labelGroup = this.svg.select('.labels-group');
        labelGroup.selectAll('.node-label').remove();
        
        const label = labelGroup.selectAll('.node-label')
            .data(nodes)
            .join('text')
            .attr('class', 'node-label')
            .text(d => d.year)
            .attr('dx', d => this.getNodeRadius(d) + 4)
            .attr('dy', 4);
        
        // Update positions on tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            label
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
        
        // Click on SVG to deselect
        this.svg.on('click', () => {
            this.clearSelection();
        });
    }
    
    drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
    
    updateNodeColors() {
        this.svg.selectAll('.node')
            .transition()
            .duration(300)
            .attr('fill', d => this.getNodeColor(d));
    }
    
    showTooltip(event, node) {
        this.tooltip
            .style('opacity', 1)
            .html(`
                <div class="tooltip-year">${node.year} · ${node.location}</div>
                <div class="tooltip-title">${node.title}</div>
            `)
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 10) + 'px');
    }
    
    hideTooltip() {
        this.tooltip.style('opacity', 0);
    }
    
    highlightConnections(node) {
        const connectedIds = new Set([node.id]);
        
        this.filteredLinks.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (sourceId === node.id) connectedIds.add(targetId);
            if (targetId === node.id) connectedIds.add(sourceId);
        });
        
        // Dim non-connected nodes
        this.svg.selectAll('.node')
            .classed('dimmed', d => !connectedIds.has(d.id));
        
        // Highlight connected links
        this.svg.selectAll('.link')
            .classed('highlighted', d => {
                const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                return sourceId === node.id || targetId === node.id;
            })
            .classed('dimmed', d => {
                const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                return sourceId !== node.id && targetId !== node.id;
            });
        
        // Show labels for connected nodes
        this.svg.selectAll('.node-label')
            .classed('visible', d => connectedIds.has(d.id));
    }
    
    clearHighlights() {
        this.svg.selectAll('.node').classed('dimmed', false);
        this.svg.selectAll('.link').classed('highlighted', false).classed('dimmed', false);
        this.svg.selectAll('.node-label').classed('visible', false);
    }
    
    selectNode(node) {
        this.selectedNode = node;
        
        // Update visual selection
        this.svg.selectAll('.node').classed('selected', d => d.id === node.id);
        
        // Show detail panel
        this.showDetailPanel(node);
    }
    
    clearSelection() {
        this.selectedNode = null;
        this.svg.selectAll('.node').classed('selected', false);
        this.closeDetailPanel();
    }
    
    centerOnNode(node) {
        this.centeredNode = node;
        
        // Get connected nodes
        const connectedIds = new Set([node.id]);
        this.filteredLinks.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (sourceId === node.id) connectedIds.add(targetId);
            if (targetId === node.id) connectedIds.add(sourceId);
        });
        
        // Filter to only show centered node and its connections
        const tempFilteredNodes = this.filteredNodes.filter(n => connectedIds.has(n.id));
        const tempFilteredLinks = this.filteredLinks.filter(l => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === node.id || targetId === node.id;
        });
        
        // Store original state
        this._originalNodes = this.filteredNodes;
        this._originalLinks = this.filteredLinks;
        
        this.filteredNodes = tempFilteredNodes;
        this.filteredLinks = tempFilteredLinks;
        
        this.render();
        
        // Show restore button
        this.showRestoreButton();
    }
    
    showRestoreButton() {
        let restoreBtn = document.getElementById('restore-view-btn');
        if (!restoreBtn) {
            restoreBtn = document.createElement('button');
            restoreBtn.id = 'restore-view-btn';
            restoreBtn.className = 'btn btn-secondary';
            restoreBtn.textContent = '← Restore Full View';
            restoreBtn.style.cssText = 'position: absolute; top: 20px; left: 280px; z-index: 100;';
            restoreBtn.addEventListener('click', () => this.restoreFullView());
            document.querySelector('.visualization-area').appendChild(restoreBtn);
        }
        restoreBtn.style.display = 'block';
    }
    
    restoreFullView() {
        if (this._originalNodes) {
            this.filteredNodes = this._originalNodes;
            this.filteredLinks = this._originalLinks;
            this.centeredNode = null;
            this.render();
            
            const restoreBtn = document.getElementById('restore-view-btn');
            if (restoreBtn) restoreBtn.style.display = 'none';
        }
    }
    
    focusOnNode(nodeId) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (node) {
            // Make sure node is visible in current filter
            if (!this.filteredNodes.find(n => n.id === nodeId)) {
                this.resetFilters();
            }
            
            this.selectNode(node);
            
            // Pan to node
            const nodeElement = this.svg.selectAll('.node').filter(d => d.id === nodeId);
            if (!nodeElement.empty()) {
                const data = nodeElement.datum();
                const transform = d3.zoomTransform(this.svg.node());
                const x = this.width / 2 - data.x * transform.k;
                const y = this.height / 2 - data.y * transform.k;
                
                this.svg.transition()
                    .duration(750)
                    .call(d3.zoom().transform, d3.zoomIdentity.translate(x, y).scale(transform.k));
            }
        }
    }
    
    showDetailPanel(node) {
        const panel = document.getElementById('detail-panel');
        const content = panel.querySelector('.detail-content');
        
        // Get connected nodes
        const connections = this.getNodeConnections(node);
        
        content.innerHTML = `
            <div class="detail-header">
                <div class="detail-year">${node.year}</div>
                <div class="detail-location">${node.location}</div>
                <h2 class="detail-title">${node.title}</h2>
            </div>
            
            <div class="detail-tags">
                ${node.types.map(t => `<span class="detail-tag type-${t.toLowerCase()}">${networkData.entryTypes[t]}</span>`).join('')}
                ${node.priorities.map(p => `<span class="detail-tag">${p}</span>`).join('')}
                ${node.focusAreas.map(f => `<span class="detail-tag">${f}</span>`).join('')}
            </div>
            
            <div class="detail-description">
                ${node.description}
            </div>
            
            ${node.citation ? `
                <div class="detail-citation">
                    ${this.formatCitation(node.citation)}
                </div>
            ` : ''}
            
            ${connections.length > 0 ? `
                <div class="detail-connections">
                    <div class="detail-connections-title">Connected Entries</div>
                    <div class="connection-list">
                        ${connections.map(c => `
                            <div class="connection-item" data-id="${c.id}">
                                <strong>${c.year}</strong> — ${c.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="detail-actions" style="margin-top: 20px;">
                <button class="btn btn-secondary" onclick="network.centerOnNode(network.selectedNode)">
                    Center Network on This
                </button>
            </div>
        `;
        
        // Add click handlers for connections
        content.querySelectorAll('.connection-item').forEach(item => {
            item.addEventListener('click', () => {
                const nodeId = parseInt(item.dataset.id);
                this.focusOnNode(nodeId);
            });
        });
        
        panel.classList.add('open');
    }
    
    getNodeConnections(node) {
        const connectedIds = new Set();
        
        this.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (sourceId === node.id) connectedIds.add(targetId);
            if (targetId === node.id) connectedIds.add(sourceId);
        });
        
        return this.nodes.filter(n => connectedIds.has(n.id));
    }
    
    formatCitation(citation) {
        // Convert URLs to clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return citation.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
    }
    
    closeDetailPanel() {
        document.getElementById('detail-panel').classList.remove('open');
    }
    
    addNewEntry() {
        const form = document.getElementById('entry-form');
        
        // Get form values
        const year = parseInt(document.getElementById('entry-year').value);
        const location = document.getElementById('entry-location').value;
        const title = document.getElementById('entry-title').value;
        const description = document.getElementById('entry-description').value;
        const citation = document.getElementById('entry-citation').value;
        const connectionsStr = document.getElementById('entry-connections').value;
        
        const types = Array.from(document.querySelectorAll('input[name="entry-type"]:checked')).map(i => i.value);
        const priorities = Array.from(document.querySelectorAll('input[name="entry-pp"]:checked')).map(i => i.value);
        const focusAreas = Array.from(document.querySelectorAll('input[name="entry-fa"]:checked')).map(i => i.value);
        
        const connections = connectionsStr ? connectionsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)) : [];
        
        // Create new entry
        const newEntry = {
            id: Math.max(...this.nodes.map(n => n.id)) + 1,
            year,
            location,
            title,
            description,
            types,
            priorities,
            focusAreas,
            citation,
            connections
        };
        
        // Add to data
        this.nodes.push(newEntry);
        networkData.nodes.push(newEntry);
        
        // Add connections as links
        connections.forEach(targetId => {
            const link = {
                source: newEntry.id,
                target: targetId,
                type: 'explicit'
            };
            this.links.push(link);
            networkData.links.push(link);
        });
        
        // Close modal and refresh
        document.getElementById('add-entry-modal').classList.remove('open');
        form.reset();
        
        this.applyFilters();
    }
    
    renderTimeline() {
        const container = document.getElementById('timeline-content');
        
        // Group entries by era
        const entriesByEra = {};
        Object.entries(networkData.eras).forEach(([key, era]) => {
            entriesByEra[key] = this.filteredNodes
                .filter(n => n.year >= era.start && n.year <= era.end)
                .sort((a, b) => a.year - b.year);
        });
        
        container.innerHTML = Object.entries(entriesByEra)
            .filter(([_, entries]) => entries.length > 0)
            .map(([key, entries]) => `
                <div class="timeline-era">
                    <h2 class="timeline-era-title">${networkData.eras[key].name} (${networkData.eras[key].start}–${networkData.eras[key].end})</h2>
                    ${entries.map(entry => `
                        <div class="timeline-entry type-${entry.types[0].toLowerCase()}" data-id="${entry.id}">
                            <div class="timeline-entry-year">${entry.year}</div>
                            <div class="timeline-entry-content">
                                <div class="timeline-entry-title">${entry.title}</div>
                                <div class="timeline-entry-location">${entry.location}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        
        // Add click handlers
        container.querySelectorAll('.timeline-entry').forEach(item => {
            item.addEventListener('click', () => {
                const nodeId = parseInt(item.dataset.id);
                const node = this.nodes.find(n => n.id === nodeId);
                if (node) {
                    this.showDetailPanel(node);
                }
            });
        });
    }
    
    handleResize() {
        const container = document.querySelector('.visualization-area');
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
        
        if (this.simulation) {
            this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
            this.simulation.alpha(0.3).restart();
        }
    }
    
    // Export data as JSON
    exportData() {
        const data = {
            nodes: networkData.nodes,
            links: networkData.links,
            eras: networkData.eras,
            focusAreas: networkData.focusAreas,
            priorities: networkData.priorities,
            entryTypes: networkData.entryTypes
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planetary-student-timeline.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // ========================================
    // RADIAL VIEW
    // ========================================
    
    setupRadialSVG() {
        const container = document.querySelector('.visualization-area');
        const size = Math.min(container.clientWidth, container.clientHeight);
        
        this.radialSvg = d3.select('#radial-svg')
            .attr('width', container.clientWidth)
            .attr('height', container.clientHeight);
        
        // Create groups
        this.radialSvg.append('g').attr('class', 'radial-links-group');
        this.radialSvg.append('g').attr('class', 'radial-nodes-group');
        this.radialSvg.append('g').attr('class', 'radial-labels-group');
        
        // Setup zoom
        const zoom = d3.zoom()
            .scaleExtent([0.3, 3])
            .on('zoom', (event) => {
                this.radialSvg.selectAll('g').attr('transform', event.transform);
            });
        
        this.radialSvg.call(zoom);
    }
    
    renderRadialView() {
        if (!this.radialSvg) {
            this.setupRadialSVG();
        }
        
        const container = document.querySelector('.visualization-area');
        const width = container.clientWidth;
        const height = container.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2 - 80;
        
        // Time scale: 1857-2025 mapped to radius
        const timeScale = d3.scaleLinear()
            .domain([1857, 2025])
            .range([50, maxRadius]);
        
        // Angle scale based on pedagogical priority sectors
        const ppSectors = {
            'PP01': { start: 210, end: 330 },  // The Discipline - bottom left
            'PP02': { start: 330, end: 90 },   // The Design Studio - top
            'PP03': { start: 90, end: 210 }    // The Academic Program - bottom right
        };
        
        // Position nodes radially
        const positionedNodes = this.filteredNodes.map(node => {
            const r = timeScale(node.year);
            
            // Determine primary PP sector
            const primaryPP = node.priorities[0] || 'PP01';
            const sector = ppSectors[primaryPP];
            
            // Position within sector based on focus area
            const primaryFA = node.focusAreas[0] || 'FA01';
            const faIndex = parseInt(primaryFA.replace('FA0', '')) - 1;
            
            // Calculate angle within sector
            let sectorSpan = sector.end - sector.start;
            if (sectorSpan < 0) sectorSpan += 360;
            
            const angleOffset = (faIndex / 6) * sectorSpan;
            let angle = sector.start + angleOffset + Math.random() * 15 - 7.5;
            angle = (angle * Math.PI) / 180; // Convert to radians
            
            return {
                ...node,
                x: centerX + r * Math.cos(angle),
                y: centerY + r * Math.sin(angle),
                r: r,
                angle: angle
            };
        });
        
        // Create node lookup
        const nodeById = new Map(positionedNodes.map(n => [n.id, n]));
        
        // Position links
        const positionedLinks = this.filteredLinks.map(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            return {
                ...link,
                source: nodeById.get(sourceId),
                target: nodeById.get(targetId)
            };
        }).filter(l => l.source && l.target);
        
        // Clear and redraw
        this.radialSvg.select('.radial-links-group').selectAll('*').remove();
        this.radialSvg.select('.radial-nodes-group').selectAll('*').remove();
        this.radialSvg.select('.radial-labels-group').selectAll('*').remove();
        
        // Draw concentric time rings
        const timeRings = [1857, 1900, 1950, 2000, 2025];
        const ringsGroup = this.radialSvg.select('.radial-links-group');
        
        timeRings.forEach(year => {
            ringsGroup.append('circle')
                .attr('cx', centerX)
                .attr('cy', centerY)
                .attr('r', timeScale(year))
                .attr('fill', 'none')
                .attr('stroke', '#2a2a2a')
                .attr('stroke-width', 0.5);
            
            ringsGroup.append('text')
                .attr('x', centerX + timeScale(year) + 5)
                .attr('y', centerY)
                .attr('fill', '#4a4a4a')
                .attr('font-size', '10px')
                .attr('font-family', 'IBM Plex Mono')
                .text(year);
        });
        
        // Draw PP sector lines
        Object.entries(ppSectors).forEach(([pp, sector]) => {
            const angle = (sector.start * Math.PI) / 180;
            ringsGroup.append('line')
                .attr('x1', centerX)
                .attr('y1', centerY)
                .attr('x2', centerX + maxRadius * Math.cos(angle))
                .attr('y2', centerY + maxRadius * Math.sin(angle))
                .attr('stroke', '#3a3a3a')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '5,5');
            
            // PP labels
            const labelAngle = (sector.start + 60) * Math.PI / 180;
            ringsGroup.append('text')
                .attr('x', centerX + (maxRadius + 30) * Math.cos(labelAngle))
                .attr('y', centerY + (maxRadius + 30) * Math.sin(labelAngle))
                .attr('fill', '#6a6a6a')
                .attr('font-size', '11px')
                .attr('font-family', 'IBM Plex Mono')
                .attr('text-anchor', 'middle')
                .text(pp);
        });
        
        // Draw links
        ringsGroup.selectAll('.radial-link')
            .data(positionedLinks)
            .enter()
            .append('line')
            .attr('class', d => `radial-link ${d.type}`)
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('stroke', d => d.type === 'lineage' ? '#c4b078' : '#4a4a4a')
            .attr('stroke-width', d => d.type === 'lineage' ? 1.5 : 0.5)
            .attr('stroke-dasharray', d => d.type === 'lineage' ? '4,2' : 'none')
            .attr('opacity', 0.4);
        
        // Draw nodes
        const nodesGroup = this.radialSvg.select('.radial-nodes-group');
        
        const nodeElements = nodesGroup.selectAll('.radial-node')
            .data(positionedNodes)
            .enter()
            .append('circle')
            .attr('class', d => `radial-node ${d.types.includes('BIB') ? 'bib' : ''}`)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.types.includes('BIB') ? 8 : 5)
            .attr('fill', d => this.getNodeColor(d))
            .attr('stroke', d => d.types.includes('BIB') ? '#c4b078' : 'none')
            .attr('stroke-width', d => d.types.includes('BIB') ? 2 : 0)
            .attr('stroke-dasharray', d => d.types.includes('BIB') ? '2,2' : 'none')
            .style('cursor', 'pointer')
            .on('mouseover', (event, d) => {
                this.tooltip
                    .style('opacity', 1)
                    .html(`<strong>${d.title}</strong><br>${d.year} | ${d.location}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', () => {
                this.tooltip.style('opacity', 0);
            })
            .on('click', (event, d) => {
                this.showDetailPanel(d);
            });
    }
    
    // ========================================
    // SHAREABLE URLS
    // ========================================
    
    getStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        return {
            view: params.get('view'),
            node: params.get('node') ? parseInt(params.get('node')) : null,
            types: params.get('types')?.split(','),
            priorities: params.get('pp')?.split(','),
            focusAreas: params.get('fa')?.split(','),
            timeStart: params.get('start') ? parseInt(params.get('start')) : null,
            timeEnd: params.get('end') ? parseInt(params.get('end')) : null,
            colorMode: params.get('color')
        };
    }
    
    applyURLState() {
        const state = this.getStateFromURL();
        
        // Apply view
        if (state.view) {
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === state.view);
            });
            document.querySelectorAll('.view-container').forEach(v => {
                v.classList.toggle('active', v.id === `${state.view}-view`);
            });
            if (state.view === 'timeline') {
                setTimeout(() => this.renderTimeline(), 100);
            } else if (state.view === 'radial') {
                setTimeout(() => this.renderRadialView(), 100);
            }
        }
        
        // Apply filters
        if (state.types) {
            document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(input => {
                if (['PD', 'ID', 'BIB'].includes(input.value)) {
                    input.checked = state.types.includes(input.value);
                }
            });
        }
        
        if (state.priorities) {
            document.querySelectorAll('.filter-group input[value^="PP"]').forEach(input => {
                input.checked = state.priorities.includes(input.value);
            });
        }
        
        if (state.focusAreas) {
            document.querySelectorAll('.filter-group input[value^="FA"]').forEach(input => {
                input.checked = state.focusAreas.includes(input.value);
            });
        }
        
        if (state.timeStart) {
            document.getElementById('time-range-start').value = state.timeStart;
            document.getElementById('time-start').textContent = state.timeStart;
        }
        
        if (state.timeEnd) {
            document.getElementById('time-range-end').value = state.timeEnd;
            document.getElementById('time-end').textContent = state.timeEnd;
        }
        
        if (state.colorMode) {
            const radio = document.querySelector(`input[name="node-display"][value="${state.colorMode}"]`);
            if (radio) {
                radio.checked = true;
                this.colorMode = state.colorMode;
            }
        }
        
        // Apply filters and select node
        this.applyFilters();
        
        if (state.node) {
            setTimeout(() => {
                const node = this.nodes.find(n => n.id === state.node);
                if (node) {
                    this.showDetailPanel(node);
                    this.centerOnNode(node);
                }
            }, 500);
        }
    }
    
    generateShareURL() {
        const params = new URLSearchParams();
        
        // Current view
        const activeView = document.querySelector('.view-btn.active')?.dataset.view || 'network';
        params.set('view', activeView);
        
        // Selected node
        if (this.selectedNode) {
            params.set('node', this.selectedNode.id);
        }
        
        // Active filters
        const activeTypes = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
            .filter(i => ['PD', 'ID', 'BIB'].includes(i.value))
            .map(i => i.value);
        if (activeTypes.length < 3) params.set('types', activeTypes.join(','));
        
        const activePP = Array.from(document.querySelectorAll('.filter-group input[value^="PP"]:checked'))
            .map(i => i.value);
        if (activePP.length < 3) params.set('pp', activePP.join(','));
        
        const activeFA = Array.from(document.querySelectorAll('.filter-group input[value^="FA"]:checked'))
            .map(i => i.value);
        if (activeFA.length < 6) params.set('fa', activeFA.join(','));
        
        // Time range
        const timeStart = parseInt(document.getElementById('time-range-start').value);
        const timeEnd = parseInt(document.getElementById('time-range-end').value);
        if (timeStart > 1857) params.set('start', timeStart);
        if (timeEnd < 2025) params.set('end', timeEnd);
        
        // Color mode
        if (this.colorMode !== 'type') params.set('color', this.colorMode);
        
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }
    
    showShareModal() {
        const url = this.generateShareURL();
        document.getElementById('share-url').value = url;
        document.getElementById('share-modal').classList.add('open');
    }
    
    copyShareURL() {
        const input = document.getElementById('share-url');
        input.select();
        document.execCommand('copy');
        
        const btn = document.getElementById('copy-url-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    }
    
    // ========================================
    // EXCEL EXPORT
    // ========================================
    
    exportExcel() {
        // Create CSV content
        const headers = ['ID', 'Year', 'Title', 'Location', 'Description', 'Types', 'Pedagogical Priorities', 'Focus Areas', 'Citation', 'Tags'];
        
        const rows = networkData.nodes.map(node => [
            node.id,
            node.year,
            `"${(node.title || '').replace(/"/g, '""')}"`,
            `"${(node.location || '').replace(/"/g, '""')}"`,
            `"${(node.description || '').replace(/"/g, '""')}"`,
            node.types?.join('; ') || '',
            node.priorities?.join('; ') || '',
            node.focusAreas?.join('; ') || '',
            `"${(node.citation || '').replace(/"/g, '""')}"`,
            node.tags?.join('; ') || ''
        ]);
        
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        
        // Download as CSV (Excel-compatible)
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'planetary-student-timeline.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // ========================================
    // LEGEND TOGGLE
    // ========================================
    
    setupLegend() {
        const toggleBtn = document.getElementById('legend-toggle');
        const panel = document.getElementById('legend-panel');
        
        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', () => {
                panel.classList.toggle('open');
                toggleBtn.textContent = panel.classList.contains('open') ? 'Hide Legend' : 'Legend';
            });
        }
    }
    
    // ========================================
    // ANNOTATION LAYER
    // ========================================
    
    annotations = [];
    
    addAnnotation(nodeId, text) {
        this.annotations.push({
            id: Date.now(),
            nodeId,
            text,
            timestamp: new Date().toISOString()
        });
        this.saveAnnotations();
    }
    
    removeAnnotation(annotationId) {
        this.annotations = this.annotations.filter(a => a.id !== annotationId);
        this.saveAnnotations();
    }
    
    saveAnnotations() {
        localStorage.setItem('planetary-student-annotations', JSON.stringify(this.annotations));
    }
    
    loadAnnotations() {
        const stored = localStorage.getItem('planetary-student-annotations');
        if (stored) {
            this.annotations = JSON.parse(stored);
        }
    }
    
    getAnnotationsForNode(nodeId) {
        return this.annotations.filter(a => a.nodeId === nodeId);
    }
}

// Initialize on DOM ready
let network;
document.addEventListener('DOMContentLoaded', () => {
    network = new PlanetaryStudentNetwork();
    
    // Setup share functionality
    document.getElementById('share-btn')?.addEventListener('click', () => network.showShareModal());
    document.getElementById('copy-url-btn')?.addEventListener('click', () => network.copyShareURL());
    document.getElementById('close-share-modal')?.addEventListener('click', () => {
        document.getElementById('share-modal').classList.remove('open');
    });
    
    // Setup export functionality
    document.getElementById('export-btn')?.addEventListener('click', () => network.exportExcel());
    
    // Setup legend
    network.setupLegend();
    
    // Load annotations
    network.loadAnnotations();
    
    // Apply URL state after initial render
    setTimeout(() => network.applyURLState(), 200);
});
