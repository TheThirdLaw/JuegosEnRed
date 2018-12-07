package es.thethirdlaw.nonamegame;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

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
			
			JsonNode readnode = mapper.readTree(message.getPayload());
			String type = readnode.get("type").asText();
			ObjectNode writenode = mapper.createObjectNode();
			String msg;
			
			switch (type) {
			
				case "getNumPlayers":
					writenode = mapper.createObjectNode();
					writenode.put("type", "getNumPlayers");
					writenode.put("longitud", players.size());
					
					msg = writenode.toString();
					session.sendMessage(new TextMessage(msg));
					break;
					
				default:
					break;
			}
		}
	}
}
