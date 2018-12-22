package es.thethirdlaw.nonamegame;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	Map<Long, Player> players = new ConcurrentHashMap<>();
	ObjectMapper mapper = new ObjectMapper();
	AtomicLong nextId = new AtomicLong(0);
	List<Obstacle> mapa = new ArrayList<>();
	boolean debug = true;
	GameController gameController = new GameController();
	
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		synchronized (sessions) {
			
			JsonNode rnode = mapper.readTree(message.getPayload());
			String type = rnode.get("type").asText();
			ObjectNode wnode = mapper.createObjectNode();
			ObjectNode jnode = mapper.createObjectNode();
			String msg;
			
			switch (type) {
			
				case "getNumPlayers":
					wnode = mapper.createObjectNode();
					wnode.put("type", "getNumPlayers");
					wnode.put("longitud", players.size());
					msg = wnode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				case "createPlayer":
					wnode = mapper.createObjectNode();
					jnode = mapper.createObjectNode();
					Player p = newPlayer();
					wnode.put("type", "createPlayer");
					jnode.put("id", p.getId());
					jnode.put("x", p.getX());
					jnode.put("y", p.getY());
					jnode.put("place", p.getPlace());
					wnode.set("jugador", jnode);
					msg = wnode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				case "getWorld":
					wnode.put("type", "getWorld");
					wnode.set("map", mapper.valueToTree(mapa));
					msg = wnode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				default:
					break;
			}
		}
	}
	
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		if (id == 1) {
			player.setX(10);
			player.setPlace(1);
			generateMap();
		} else {
			player.setX(100);
			player.setPlace(2);
		}
		player.setY(320);
		players.put(player.getId(), player);
		return player;
	}
	
	public void generateMap(){
		for (int i = 0; i < 20; i++) {
			if (Math.random() >= 0.5) {
				double randX = Math.floor(Math.random() * 301);
				double randY = Math.floor(Math.random() * 141) + 140;
				double sprite = Math.floor(Math.random() * 14) + 1;
				mapa.add(new Obstacle(800 * i + randX, 550 - randY, true, sprite));
			}
			if (Math.random() >= 0.5) {
				double randX = Math.floor(Math.random() * 301) + 400;
				double randY = Math.floor(Math.random() * 141) + 140;
				double sprite = Math.floor(Math.random() * 14) + 1;
				mapa.add(new Obstacle(800 * i + randX, 550 - randY, true, sprite));
			}
			if (Math.random() >= 0.5) {
				double randX = Math.floor(Math.random() * 301);
				double randY = Math.floor(Math.random() * 141);
				double sprite = Math.floor(Math.random() * 14) + 1;
				mapa.add(new Obstacle(800 * i + randX, 550 - randY, true, sprite));
			}
			if (Math.random() >= 0.5) {
				double randX = Math.floor(Math.random() * 301) + 400;
				double randY = Math.floor(Math.random() * 141);
				double sprite = Math.floor(Math.random() * 14) + 1;
				mapa.add(new Obstacle(800 * i + randX, 550 - randY, true, sprite));
			}
			double rand = Math.floor(Math.random() * 7);
		    for(int j = 0; j < rand; j++){
		        double randX = Math.floor(Math.random() * 801);
		        double randY = Math.floor(Math.random() * 281);
		        double sprite = Math.floor(Math.random() * 14) + 1;
				mapa.add(new Obstacle(800 * i + randX, 550 - randY, false, sprite));
		    }
		}
	}
	
	/*public ResponseEntity<List<Obstacle>> getWorld() {
		return new ResponseEntity<>(mapa, HttpStatus.OK);
	}*/
}
